var express = require('express')
var app = express()
const path = require('path');
var knex = require('knex');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');


knex = knex({
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: 'test',
		database: 'majorproject'
	}
	
});

app.use(cookieSession({
	name: "session",
	keys: ['key1', 'key2']

}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(path.join(__dirname,'static')));


app.set('view engine', 'ejs');

function redirecthome(req, res, next)
{
	if(req.session.username)
	{
		next();
		
	}
	else
	{
		res.redirect("/");
	}
}


app.get('/', function (req, res) {

		var username = "";
		if(req.session.username) {
			username = req.session.username;
			if(req.session.type=='company'){
				res.redirect('/companyHome');
			}
			else{
				res.redirect('/userHome');
			 // res.render('userHome.ejs', {username:username});
			}
		}
		else{
			res.render('home.ejs', {username : username});
		}
		
	
  
})

app.get('/login', function (req, res) {
	if(req.session.username) 
	{
		res.redirect('/userHome');
	}
	else
  		res.render('LoginForm.ejs', {message : "",
  									 alertMsg: "",
  									 email1 : "",
  									 comp1 : "",
  									 address2 : "",
  									 phone2 : "",
  									 name2 : ""
  									});
})

app.post("/login", function(req, res){

	var obj = req.body;
	console.log(obj);
	knex("logintable").select('Username', 'Password', 'Type').where('Username', '=', obj.username)
	.then(data => {
			console.log("hey this is data", data);
			if(data.length==0 ||data[0].Password != obj.password || data[0].Type != obj.option){
				res.render('LoginForm.ejs', {message : "Wrong username/password",
											alertMsg : "",
											email1 : "",
		  									comp1 : "",
		  									address2 : "",
		  									phone2 : "",
		  									name2 : ""
											});
			}
			else{
				req.session.username = obj.username;
				req.session.type = obj.option;
				req.session.loggedin = true;
				if(obj.option == 'company'){
					res.redirect("/companyHome");
				}
				else{
					res.redirect("/userHome");
				}
			}
		
	})
	.catch(err=>res.send(err));
})

app.post("/register", function (req, res){
	var obj = req.body;
	console.log(obj);
	if(obj.password != obj.confirmpassword)
	{
		console.log("password do not match");
		res.render('Loginform.ejs', {message:"", 
									alertMsg:"*Registration failed as passwords do not match!!",
									email1 : obj.email,
  									comp1 : obj.companyname,
  									address2 : obj.address,
  									phone2 : obj.phone,
  									name2 : obj.username
								})
		
	}
	else
	{
		knex("logintable").select('email', 'Username').where('email', '=', obj.email)
		.then(data => {
			if(data.length != 0){
				res.render('LoginForm.ejs', {message:"", 
											alertMsg : "Email already Registered!!",
											email1 : "",
		  									comp1 : obj.companyname,
		  									address2 : obj.address,
		  									phone2 : obj.phone,
		  									name2 : obj.username
										});
			}
			else{
				knex("logintable").select('Username').where('Username', '=', obj.username)
				.then(data=>{
					if(data.length != 0){
						res.render('Loginform.ejs', {message : "", 
													alertMsg:"Username already taken!!",
													email1 : obj.email,
				  									comp1 : obj.companyname,
				  									address2 : obj.address,
				  									phone2 : obj.phone,
				  									name2 : ""
												});
					}
					else{
						knex("logintable").insert({
							username: obj.username, 
							companyname: obj.companyname,
							email: obj.email,
							phoneno: obj.phone,
							address: obj.address,
							password: obj.password,
							type: obj.option
						})
						.then(()=>{
							knex("userdetails").insert({
								username : obj.username,
								name : obj.companyname,
								email : obj.email,
								'Phone no': obj.phone,
								Address : obj.address
							}).then(()=>{
								res.render('Loginform.ejs', {message:"", 
														alertMsg: "User Registered Successfully. Now user may login",
														email1 : "",
					  									 comp1 : "",
					  									 address2 : "",
					  									 phone2 : "",
					  									 name2 : ""
													});
							})
							
						})
						.catch(err=>{
							res.send("check you terminal for errors!!");
							console.log(err);
						})
					}
				})
				
			}
		})
		
	}

});

app.get('/login2', function (req, res) {
  res.render('login2.ejs')
})

app.get('/userhome', function (req, res) {
	var username="";
	if(req.session.username) username=req.session.username;
	knex('userdetails').select('*').where('username','=',username)
	.then(data => {
		knex('company details').select('*')
		.then(company => {
			knex('vacancy').select('*')
			.then(vacancy => {
				knex('applied jobs').select('*').where('username', '=', username)
				.then(jobs => {
					res.render('userHome.ejs', {data : data,
												company : company,
												vacancy : vacancy,
												jobs : jobs
												});
				})
			})
		})
		
	})
  
})

app.get('/userprofile', function (req, res) {
	knex('userdetails').select('*').where('username','=',req.session.username)
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
						res.render('userProfile.ejs', {data : data,
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

app.post('/saveDetails', function(req, res){
	var obj = req.body;
	if(obj.dob == '') obj.dob=null;
	console.log(obj);
	knex('userdetails').where('username', '=', obj.username).update({
		'DOB' : obj.dob,
		'Gender' : obj.gender,
		'Address' : obj.address,
		'About' : obj.about
	})
	.then(()=>{
		res.redirect('/userprofile');
	})
	
})

app.post('/saveEducation', function(req, res){
	var obj = req.body;
	knex('usereducation').select('id').where('username', '=', req.session.username)
	.then(data => {
		var n = data.length;
		var identity = 1;
		if(n!=0){
			var last = data[n-1].id;
			identity = last + 1;
		}
		
		knex('usereducation').insert({
			'UserName' : req.session.username,
			'Institute name' : obj.Institute,
			'Program' : obj.program,
			'StartDate' : obj.Start,
			'EndDate' : obj.End,
			'Grade Scale' : obj.Scale,
			'Grade Obtained' : obj.Grade,
			'Major Sub I' : obj.major1,
			'Major Sub II' : obj.major2,
			'id' : identity
		})
		.then(()=>{
			res.redirect('/userprofile');
		})
	})
	
})

app.post('/deleteEducation', function(req, res){
	knex('usereducation').where("username", "=", req.session.username).where("id", "=", req.body.id)
	.del().then((count)=>{
		console.log("No. of rows deleted : ", count);
		res.redirect('/userprofile');
	})
})

app.post('/saveExperience', function(req, res){
	var obj = req.body;
	
	knex('userexperience').select('id').where('username', '=', req.session.username)
	.then(data => {
		var n = data.length;
		var identity = 1;
		if(n!=0){
			var last = data[n-1].id;
			identity = last + 1;
		}
		
		knex('userexperience').insert({
			'UserName' : req.session.username,
			'Company name' : obj.Company,
			'StartDate' : obj.Start1,
			'EndDate' : obj.End1,
			'Description' : obj.Description,
			'id' : identity
		})
		.then(()=>{
			res.redirect('/userprofile');
		})
	})
})

app.post('/deleteExperience', function(req, res){
	knex('userexperience').where("username", "=", req.session.username).where("id", "=", req.body.id)
	.del().then((count)=>{
		console.log("No. of rows deleted : ", count);
		res.redirect('/userprofile');
	})
})

app.post('/saveSkills', function(req, res){
	var obj = req.body;
	knex('user skills').where("username","=",req.session.username)
	.del().then(()=>{
		var a = [];
		for(var v in obj){
			var arr = obj[v].split(',');
			var user = req.session.username;
			if(arr.length == 0) continue;
			for(var i=0; i<arr.length-1; i++){
				console.log("inside node js ", arr[i].trim(), arr[i].trim().length);
				a.push({
					username : user,
					'Skills name' : arr[i].trim(),
					'Skill Category' : v
				})
				
			}
		}

		knex('user skills').insert(a)
		.then(()=>{
			res.redirect('/userprofile');
		})
		
	})
	
})

app.post('/saveProject', function(req, res){
	var obj = req.body;
	knex('user project').select('id').where('username', '=', req.session.username)
	.then(data => {
		var n = data.length;
		var identity = 1;
		if(n!=0){
			var last = data[n-1].id;
			identity = last + 1;
		}
		
		knex('user project').insert({
			'UserName' : req.session.username,
			'Title' : obj.title,
			'Company Name' : obj.guide,
			'StartDate' : obj.Start2,
			'EndDate' : obj.End2,
			'Description' : obj.description,
			'id' : identity
		})
		.then(()=>{
			res.redirect('/userprofile');
		})
	})

})

app.post('/deleteProject', function(req, res){
	knex('user project').where("username", "=", req.session.username).where("id", "=", req.body.id)
	.del().then((count)=>{
		console.log("No. of rows deleted : ", count);
		res.redirect('/userprofile');
	})
})

app.get('/appliedJobs', function (req, res) {
	console.log("applied jobs");
	knex('userdetails').select('*').where('username','=',req.session.username)
	.then(data => {
		knex('applied jobs').select('*').where('UserName', '=', req.session.username)
		.then(jobs => {
			console.log(req.session.username,jobs.length);
			res.render('appliedJobs.ejs', {jobs : jobs,
											data : data});
		})
	})
  	
})

app.post('/withdraw', function(req, res){
	var obj = req.body;
	console.log(obj);

	knex('applied jobs').update({'Status' : 'Withdrawn'}).where('username', '=', req.session.username)
	.where('Job Id','=',obj.id)
	.then(()=>{
		knex('vacancy').select('No of Applicants').where('Job Id', '=', obj.id)
		.then(no => {
			knex('vacancy').update({'No of Applicants' : no[0]['No of Applicants']-1}).where('Job Id', '=', obj.id)
			.then(()=>{
				res.redirect('/appliedJobs');
			})
		})
		
	})
})

app.post('/applyJob', function(req, res){
	var obj = req.body;
	knex('applied jobs').select('*').where('UserName','=',req.session.username).where('Job Id', '=', obj.id)
	.then(data => {
		if(data.length==0){
			knex('applied jobs').insert({
				UserName : req.session.username,
				'Company name' : obj.companyname,
				Role : obj.role,
				'Application Date' : new Date(),
				'Status' : 'Pending',
				'Job Id' : obj.id
			})
			.then(()=>{
				knex('vacancy').select('No of Applicants').where('Job Id', '=', obj.id)
				.then(no => {
					knex('vacancy').update({'No of Applicants' : no[0]['No of Applicants']+1}).where('Job Id', '=', obj.id)
					.then(()=>{
						knex('applicants').insert({
							'Job Id' : obj.id,
							'Company name' : obj.company,
							'Username' : req.session.username
						})
						.then(()=>{
							res.redirect('/userHome');
						})
					})
				})
				
			})
		}
		else{
			knex('applied jobs').update({'Status' : 'Pending'}).where('UserName','=',req.session.username)
			.where('Job Id','=',obj.id)
			.then(()=>{
				knex('vacancy').select('No of Applicants').where('Job Id', '=', obj.id)
				.then(no => {
					knex('vacancy').update({'No of Applicants' : no[0]['No of Applicants']+1}).where('Job Id', '=', obj.id)
					.then(()=>{
						res.redirect('/userHome');
					})
				})
				
			})
		}
	})
				
			
})
 
app.get('/companyHome', function (req, res) {
  res.render('HomeCompany.ejs', {company : req.session.username})
})

app.get('/viewt', function (req, res) {
  res.render('viewt.ejs')
})

app.get('/logout', function (req, res) {
  req.session = null;
  res.redirect('/');
})
app.listen(4000)