var express = require('express'); //include express node module.
var app = express();

//setting view engine
app.set('view engine', 'ejs')


//by default folder name is views (on root directory)
app.set('views', __dirname + "/views");

//Render Pages
app.get('/', function(req, res){
res.render('default', {title: 'MyPageTitle'});
});

app.get('/contact', function(req, res){
res.render('contact', {title: 'MyContactPage'});
});

/*
//# Routing #
//home
app.get('/', function(req, res){
res.send('Hello Express');
});

//contact
app.get('/contact', function(req, res){
res.send('This is My Contact Page.');
});

//Request Parameters
app.get('/class/:student?', function(req, res){
var _student = req.params.student;
res.send('Sutdent Name is: ' + _student);
});

//Request Other Parameters
app.get('/class/:student?/:standard?', function(req, res){
var _student = req.params.student;
var _standard = req.params.standard;
res.send('Sutdent: ' + _student + ' is in ' + _standard + ' standard');
});

*/

//Unknown Route or Bad Route
app.get('*', function(req, res){
res.send('<h1>404 Error</h1>');
});

var server = app.listen(3003, function(){
console.log('Go to http://localhost:3003');
});
