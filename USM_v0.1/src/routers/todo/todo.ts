/// <reference path="./../../../typings/tsd.d.ts" />
import express = require("express");
var router : express.Router = express.Router();

//import controller
import * as controller from "./../../controllers/todo/todo";

//Get
router.get('/', controller.GetIndex); 

//method 01 calling callback without return keyword
router.get('/todo.json', controller.GetTodoList1); 

//method 02 using Promise Pattren
router.get('/todo.json2', controller.GetTodoList2); 

//method 03 passing next parameter
router.get('/todo.json3', controller.GetTodoList3)

//Post From Server (EJS)
router.post('/',controller.PostIndex);

router.post('/create/', controller.PostCreate);

//Delete on get req.
router.get('/delete/:id', controller.GetDelete);

export = router;