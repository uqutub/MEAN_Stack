/// <reference path="./../typings/tsd.d.ts" />

import express = require('express'); 					//import express module from dafinatelytyped file (d.ts)
import path = require('path'); 							//import path module (builten module from express/node)
var signalRJS = require('./../node_modules/signalrjs/lib/signalRJS');	//import signalRJS

//init signalR
var signalR = signalRJS();

//Create the hub connection
//NOTE: Server methods are defined as an object on the second argument
signalR.hub('chatHub',{
    send : function(userName,message){
        this.clients.all.invoke('broadcast').withArgs([userName,message])
        ////console.log('send:'+message);
    }
});


//Imports Routers
import indexRouter = require("./routers/index"); 		//Import/Initialze Router for index/homepage
import chatRouter = require("./routers/chat/chat"); 			//Import/Initialze Router for chating

//Start Express
let app : express.Express = express();						//Start Express

// Express Vairaible Settings
app.set('views', path.join(__dirname, '../views'));		//setting express variables (declaring for views directory)
app.set('view engine', 'ejs');							//setting express variables (declaring view engine for express)

//signalR before static path hadel middleware for signalr
app.use(signalR.createListener());

//Middlewaress
app.use(express.static(path.join(__dirname, '/../public')));	//defining static path for current project

//middleware logging just
app.use((req, res, next) => {									//Logging on console
	console.log('Logging: ' + req.method.toString() + ': ' + req.url.toString());
	next();
});

//Handle Routes after some middlewares
app.use('/', indexRouter);
app.use('/chat', chatRouter);

//Middleware Handling for other Routes
app.get('*', (req,res)=>{										//catching unknown route
	res.render('shared/_layout', { 
            message: "Error: 404, The Page Cannot Find.", 
            error: {},
			items: null, title: "Err", view:"_err" 
    }); 
});


//Catching Middleware Errors
app.use((err: any, req, res, next) => {							//Catching errors from middleware (app.use takes fur params.)
	if (app.get('env') === 'development') { 
		res.status(err.status || 500); 
        res.render('shared/_layout', { 
            message: err.message, 
            error: err,
			items: null, title: "Err", view:"_err" 
        }); 
	
	} else {
		// production error handler 
		// no stacktraces leaked to user 
		res.status(err.status || 500); 
    	res.render('shared/_layout', { 
			message: err.message, 
			error: {},
			items: null, title: "Err", view:"_err"  
    	}); 
	} //else closing
});


//export = app;
export var appModule = {appVar: app, signalrVar: signalR};