
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
/*

knex('userdetails')
	.select('EmailId').where('SrNo', '=', 1)
	.then(data=>{
		console.log(data);

	})

	*/

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
		if(req.session.username) username = req.session.username;

		res.render('home.ejs', {username:username});
	
  
})

app.get('/login', function (req, res) {
	if(req.session.username) 
	{
		res.redirect('/userHome');
	}
	else
  		res.render('LoginForm.ejs', {message : ""});
})

app.post("/login", function(req, res){

	var obj = req.body;
	console.log(obj);
	knex("logintable").select('Username', 'Password').where('Username', '=', obj.username)
	.then(data => {
			console.log("hey this is data", data);
			if(data.length==0 ||data[0].Password != obj.password){
				res.render('LoginForm.ejs', {message : "Wrong username/password"});
			}
			else{

				req.session.username = obj.username;
				req.session.loggedin = true;
				res.redirect("/userHome");
			}
		
	})
	.catch(err=>res.send(err));
})

app.post("/register", function (req, res){
	var obj = req.body;
	if(obj.password != obj.confirmpassword)
	{
		res.send("Passwords do not match");
	}
	else
	{
		knex("logintable").insert({
			username: obj.username, 
			companyname: obj.companyname,
			emailid: obj.email,
			phoneno: obj.phone,
			address: obj.address,
			password: obj.password,
			type: obj.option
		})
		.then(()=>{
			res.render('Loginform.ejs', {message: "User Registered Successfully. Now user may login"});
		})
		.catch(err=>{
			console.log(err);
		})
	}

});

app.get('/login2', function (req, res) {
  res.render('login2.ejs')
})

app.get('/userhome', function (req, res) {
  res.render('userHome.ejs')
})

app.get('/userprofile', function (req, res) {
  res.render('userProfile.ejs')
})

app.get('/appliedJobs', redirecthome, function (req, res) {
  res.render('appliedJobs.ejs')
})
 
app.get('/companyHome', function (req, res) {
  res.render('HomeCompany.ejs')
})

app.get('/viewt', function (req, res) {
  res.render('viewt.ejs')
})

app.get('/logout', function (req, res) {
  req.session = null;
  res.redirect('/');
})
app.listen(4000)