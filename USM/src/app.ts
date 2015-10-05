/// <reference path="./../typings/tsd.d.ts" />

import express = require('express'); 					//import express module from dafinatelytyped file (d.ts)
import path = require('path'); 							//import path module (builten module from express/node)
import bodyParser = require('body-parser'); 			//import body-parser module/third party middleware
import mongoose = require('mongoose'); 					//import mongodb driver

mongoose.connect('mongodb://localhost:27017/todo-test');	//connect to mongodb
//require('./model/mongoose');								//Initialze Models

//Imports Routers
//import {router} from "./routers/index";
import indexRouter = require("./routers/index"); 			//Import/Initialze Router for Quiz
import userRouter = require("./routers/usm/user"); 			//Import/Initialze Router for Quiz

//Start Express
let app : express.Express = express();						//Start Express

// Express Vairaible Settings
app.set('views', path.join(__dirname, '../views'));		//setting express variables (declaring for views directory)
app.set('view engine', 'ejs')							//setting express variables (declaring view engine for express)

//Middlewaress
app.use(bodyParser.json());										//Using bodyparser for getting post request variables (to support application/JSON-encoded bodies)
app.use(bodyParser.urlencoded({extended	:false}))				//parse application/x-www-form-urlencoded (to support URL-encoded bodies)
app.use(express.static(path.join(__dirname, '/../public')));	//defining static path for current project

app.use((req, res, next) => {									//Logging on console
	console.log('Logging: ' + req.method.toString() + ': ' + req.url.toString());
	next();
});

//Handle Routes after some middlewares
app.use('/', indexRouter);
app.use('/user', userRouter);

app.get('*', (req,res)=>{										//catching unknown route
	res.send("Error: 404");
});


//Catching Middleware Errors
app.use((err: any, req, res, next) => {							//Catching errors from middleware (app.use takes fur params.)
	if (app.get('env') === 'development') { 
		// development error handler 
		// will print stacktrace 
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


export = app;
