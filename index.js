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
  res.render('userHome.ejs', {username : username});
})

app.get('/userprofile', function (req, res) {
	knex('userdetails').select('*').where('username','=',req.session.username)
	.then(data => {
		res.render('userProfile.ejs', {data : data})
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

app.get('/appliedJobs', function (req, res) {
	console.log("applied jobs");
  res.render('appliedJobs.ejs')
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