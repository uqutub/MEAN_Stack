/// <reference path="./../typings/tsd.d.ts" />

import {appModule} from './app';

//Get port from environment and store in Express. 
var port: number = process.env.PORT || 4000;		//Defining port number

//set vairiables in Express
appModule.appVar.set('port', port);
appModule.appVar.set('env', 'development');
appModule.appVar.set('address', 'localhost') 

//Starting / Listening 
var server = appModule.appVar.listen(port, () => {							//start listner
	var listeningPort: number = server.address().port;
	console.log('The server is listening on: ' + appModule.appVar.get('address') +':'+ listeningPort);
});


//After Connected console log
appModule.signalrVar.on('CONNECTED',function(){
    console.log('connected');
});