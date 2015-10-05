/// <reference path="./../typings/tsd.d.ts" />
var appModule = require("./app");
//import app = require('./app'); 
//Get port from environment and store in Express. 
var port = process.env.PORT || 4000; //Defining port number
//set vairiables in Express
appModule.set('port', port);
appModule.set('env', 'development');
appModule.set('address', 'localhost');
//Starting / Listening 
var server = appModule.listen(port, function () {
    var listeningPort = server.address().port;
    console.log('The server is listening on: ' + appModule.get('address') + ':' + listeningPort);
});
