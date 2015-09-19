///<reference path="./../typings/express/express.d.ts"/>
var path = require('path');
var express = require("express");
//Import/Initialze Router
var indexRouter = require("./routes/index");
var todoRouter = require("./routes/todo");
var app = express();
// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/../public')));
//Middle Ware
app.use(function (req, res, next) {
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
app.get('*', function (req, res) {
    res.send("Error: 404");
});
var port = process.env.PORT || 4000;
var server = app.listen(port, function () {
    var listeningPort = server.address().port;
    console.log('The server is listening on port: ' + listeningPort);
});
