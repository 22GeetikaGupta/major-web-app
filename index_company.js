var express = require('express');
var knex = require('knex');
var router = express.Router();



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
        let queryar = [];
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
            
        });
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
    res.render('newJob');
})

module.exports = router;