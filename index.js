var express = require('express')
var app = express()
const path = require('path');

app.use('/public', express.static(path.join(__dirname,'static')));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('home.ejs')
})

app.get('/login', function (req, res) {
  res.render('LoginForm.ejs')
})

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