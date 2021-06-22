var express = require('express');
var knex = require('knex');
var router = express.Router();
var bodyParser = require('body-parser');
var file = require('fs');
router.use(bodyParser.urlencoded({extended: true}));


knex = knex({
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: 'test',
		database: 'majorproject'
	}
	
});


let isLoggedIn = (req, res, next)=>{
    if(req.session.username && req.session.type == 'company')
    {
        next();
    }
    else{
        res.redirect('/');
    }
}
router.get('/', isLoggedIn, (req, res)=>{
    
    knex('vacancy').select('*')
    .where('username', '=', req.session.username)
    .then(data=>{
        res.render('HomeCompany.ejs', {data});    
    });
    
}); 

router.post('/closevacancy', isLoggedIn, (req, res)=>{
    
    knex('vacancy').where('Job Id', '=', req.body.jobid).del()
    .then(data=>{
        res.redirect('/companyHome');
    });
    res.redirect('/companyHome');
});

router.post('/viewapplicants', isLoggedIn, (req, res)=>{
    console.log(req.body);
    knex('applicants').select('username').where('Job Id', req.body.jobid)
    .then(data=>{
        let queryar = ["none"];
        for(let user of data)
        {
            queryar.push(user.username);
        }
        knex.raw('select * from `user skills` where UserName in (?)', [queryar])
        .then(userinfo=>{
            userdict = {};
            userinfo = userinfo[0];
            
            for(element of userinfo)
            {
                if(!userdict[element.UserName]) userdict[element.UserName] = element["Skills name"] + ", ";
                else userdict[element.UserName] += element["Skills name"] + ", ";
            }

            res.render('viewt', {userdict});
            
        })
        .catch(console.log);
    })
});

router.get('/resume', isLoggedIn, (req, res)=>{
    let resumeid = req.query.id;

    knex('userdetails').select('*').where('username','=', resumeid)
    .then(data => {
        knex('usereducation').select('*').where('username', '=', data[0].UserName)
        .then(education => {
            for(var i=0; i<education.length; i++){
                education[i]['Institute name'] = education[i]['Institute name'].toUpperCase();
                education[i].StartDate = education[i].StartDate.toDateString().slice(4);
                education[i].EndDate = education[i].EndDate.toDateString().slice(4);
            }

            knex('userexperience').select('*').where('username', '=', data[0].UserName)
            .then(experience => {
                for(var i=0; i<experience.length; i++){
                    experience[i]['Company name'] = experience[i]['Company name'].toUpperCase();
                    experience[i].StartDate = experience[i].StartDate.toDateString().slice(4);
                    experience[i].EndDate = experience[i].EndDate.toDateString().slice(4);
                }

                knex('user skills').select('*').where('username', '=', data[0].UserName)
                .then(skills => {

                    knex('user project').select('*').where('username', '=', data[0].UserName)
                    .then(projects => {
                        for(var i=0; i<projects.length; i++){
                            projects[i]['Title'] = projects[i]['Title'].toUpperCase();
                            projects[i]['Company Name'] = projects[i]['Company Name'].toUpperCase();
                            projects[i].StartDate = projects[i].StartDate.toDateString().slice(4);
                            projects[i].EndDate = projects[i].EndDate.toDateString().slice(4);
                        }
                        res.render('userResume.ejs', {data : data,
                                           education : education,
                                            experience : experience,
                                            skills : skills,
                                            projects : projects
                                            })
                    })
                    
                })
                
            })
            
            
        })
        
    })
    
})

router.get('/newjob', isLoggedIn, (req, res)=>{
    res.render('newJob', {message: ""});
})

router.post('/newjob', isLoggedIn, (req, res)=>{
    for(let key in req.body)
    {
        if(req.body[key] == "")
        {
            res.render('newJob', {message: "Please fill all the details"});
        }
    }

    file.readFile('./jobid.txt', 'utf-8', function(err, data){
        if(err)
        {
            res.render('newJob', {message: "Error creating new job"});
        }else{
            jobid = data.toString();
            file.writeFile('./jobid.txt', parseInt(data)+1, function(err){
                if(err)
                {
                     res.render('newJob', {message: "Error creating new job"});

                }
                else{
                    knex('vacancy').insert({
                        UserName: req.session.username,
                        Role: req.body.role,
                        Place: req.body.place,
                        Date: new Date(), 
                        "No of Applicants": 0,
                        "Job Id": jobid,
                        Requirements: req.body.requirements
                    })
                    .then(data=>{
                        res.render('newJob', {message: "Job added"});
                    })
                    .catch(console.log);

                }
            })
        }
    })
});

router.get('/aboutus', isLoggedIn, (req, res)=>{
    knex('company details').where('UserName', req.session.username)
    .then(data=>{
        let actualdate = data[0]['Established Date'];
        data[0]['Established Date'] =  actualdate.getFullYear() + "-";
        data[0]['Established Date'] += actualdate.getMonth()<9 ? "0" + (actualdate.getMonth()+1): actualdate.getMonth()+1;
        data[0]['Established Date'] += "-" ;
        data[0]['Established Date'] += actualdate.getDay()<9?"0"+(actualdate.getDay()+1): actualdate.getDay()+1;
        
        
        console.log( data[0]['Established Date']);
        res.render('aboutus', {data: data[0]});
    })
    
});

router.post('/aboutus', isLoggedIn, (req, res)=>{
    knex('company details').where('UserName', req.session.username).update ({
        UserName: req.session.username,
        about: req.body.about,
        "Company name": req.body.companyname,
        "Established Date": req.body.estdate,
        "No of Employee": req.body.empcount
    })
    .then(data=>{
        res.redirect('/companyHome/aboutus');
    })
    .catch(console.log);
})

module.exports = router;