/// <reference path="./../typings/tsd.d.ts" />

import * as appModule from "./app";
//import app = require('./app'); 

//Get port from environment and store in Express. 
var port: number = process.env.PORT || 4000;		//Defining port number

//set vairiables in Express
appModule.set('port', port);
appModule.set('env', 'development');
appModule.set('address', 'localhost') 

//Starting / Listening 
var server = appModule.listen(port, () => {							//start listner
	var listeningPort: number = server.address().port;
	console.log('The server is listening on: ' + appModule.get('address') +':'+ listeningPort);
});