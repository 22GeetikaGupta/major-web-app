
var express = require('express')
var app = express()
const path = require('path');
var knex = require('knex');
var bodyParser = require('body-parser');


knex = knex({
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: 'test',
		database: 'majorproject'
	}
	
});

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

app.get('/', function (req, res) {
	res.render('home.ejs');
	
  
})

app.get('/login', function (req, res) {
  res.render('LoginForm.ejs')
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

app.get('/appliedJobs', function (req, res) {
  res.render('appliedJobs.ejs')
})
 
app.get('/companyHome', function (req, res) {
  res.render('HomeCompany.ejs')
})

app.get('/viewt', function (req, res) {
  res.render('viewt.ejs')
})
app.listen(4000)