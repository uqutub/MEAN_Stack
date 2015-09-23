///<reference path="./../typings/tsd.d.ts"/>

import express = require("express");
import path = require('path');
import bodyParser = require("body-parser");
import indexRouter = require("./routes/index"); //Import/Initialze Router
import todoRouter = require("./routes/todo"); //Import/Initialze Router
import mongoose = require('mongoose'); //import mongodb
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/todo-test');

//Initialze Models
require('./model/mongoose');

var app : express.Express = express();

// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended	:false}))

app.use(express.static(path.join(__dirname, '/../public')));

//Middle Ware
app.use((req, res, next)=>{
console.log('Method: ' + req.method.toString() + ' - ' + req.url.toString());

/*if(req.method == 'POST')
{
console.log('potssss');
}*/

next();
});


//Handle Routes
app.use('/', indexRouter);
app.use('/todo', todoRouter);

app.get('*', (req,res)=>{
	res.send("Error: 404");
});


var port: number = process.env.PORT || 4000;
var server = app.listen(port, () => {
var listeningPort: number = server.address().port;
console.log('The server is listening on port: ' + listeningPort);
});