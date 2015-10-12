/// <reference path="./../typings/tsd.d.ts" />
var app_1 = require('./app');
//import * as appModule from "./app";
//import app = require('./app'); 
//Get port from environment and store in Express. 
var port = process.env.PORT || 4000; //Defining port number
//set vairiables in Express
app_1.appModule.appVar.set('port', port);
app_1.appModule.appVar.set('env', 'development');
app_1.appModule.appVar.set('address', 'localhost');
//Starting / Listening 
var server = app_1.appModule.appVar.listen(port, function () {
    var listeningPort = server.address().port;
    console.log('The server is listening on: ' + app_1.appModule.appVar.get('address') + ':' + listeningPort);
});
//After Connected console log
app_1.appModule.signalrVar.on('CONNECTED', function () {
    console.log('connected');
    // setInterval(function () {
    //     appModule.signalrVar.send({time:new Date()});
    // },1000)
});
