/// <reference path="./../typings/tsd.d.ts" />
var express = require('express'); //import express module from dafinatelytyped file (d.ts)
var path = require('path'); //import path module (builten module from express/node)
var bodyParser = require('body-parser'); //import body-parser module/third party middleware
var mongoose = require('mongoose'); //import mongodb driver
mongoose.connect('mongodb://localhost:27017/todo-test'); //connect to mongodb
//require('./model/mongoose');								//Initialze Models
//Imports Routers
//import {router} from "./routers/index";
var indexRouter = require("./routers/index"); //Import/Initialze Router for Quiz
var userRouter = require("./routers/usm/user"); //Import/Initialze Router for Quiz
//Start Express
var app = express(); //Start Express
// Express Vairaible Settings
app.set('views', path.join(__dirname, '../views')); //setting express variables (declaring for views directory)
app.set('view engine', 'ejs'); //setting express variables (declaring view engine for express)
//Middlewaress
app.use(bodyParser.json()); //Using bodyparser for getting post request variables (to support application/JSON-encoded bodies)
app.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-form-urlencoded (to support URL-encoded bodies)
app.use(express.static(path.join(__dirname, '/../public'))); //defining static path for current project
app.use(function (req, res, next) {
    console.log('Logging: ' + req.method.toString() + ': ' + req.url.toString());
    next();
});
//Handle Routes after some middlewares
app.use('/', indexRouter);
app.use('/user', userRouter);
app.get('*', function (req, res) {
    res.send("Error: 404");
});
//Catching Middleware Errors
app.use(function (err, req, res, next) {
    if (app.get('env') === 'development') {
        // development error handler 
        // will print stacktrace 
        res.status(err.status || 500);
        res.render('shared/_layout', {
            message: err.message,
            error: err,
            items: null, title: "Err", view: "_err"
        });
    }
    else {
        // production error handler 
        // no stacktraces leaked to user 
        res.status(err.status || 500);
        res.render('shared/_layout', {
            message: err.message,
            error: {},
            items: null, title: "Err", view: "_err"
        });
    } //else closing
});
module.exports = app;
