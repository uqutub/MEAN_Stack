// /// <reference path="./../../typings/tsd.d.ts" />
// import express = require('express'); 					//import express module from dafinatelytyped file (d.ts) for routing
// var router : express.Router = express.Router();							//Create Router

import * as indexRouter from "./router"


indexRouter.get('/', (req, res) => {
res.render('shared/_layout', {title: "Todo-App", view:"_index"});
}); 

export = indexRouter;