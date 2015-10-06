/// <reference path="./../../../typings/tsd.d.ts" />

import express = require("express");
var router = express.Router();

//import model
import {ITodoItem, TaskStatus, TodoItem} from "./../../models/todo/todo";

//Custom Helper
import {ReturnJson, IRenderObject} from './../../helpers/myHelper';

//Creating Class Object
let classObj = new TodoItem();

//Creating Render Object 
let RenderObject : IRenderObject = {model: null, title: "Todo-App", view:"_todo"};


//Export Object
let Controller = {
	GetIndex: (req : express.Request, res : express.Response) => {
		RenderObject.model = TodoItem.TodoArray;
		res.render('shared/_layout', RenderObject );
	},
	//
	GetTodoList1: (req : express.Request, res : express.Response) => { 
		classObj.GetJson(ReturnJson(req, res));
	},
	//
	GetTodoList2: (req : express.Request, res : express.Response) => { 
		classObj.GetJson2().then((data) => {
			res.json(data);
		},(err) => {
			res.json({status: 404, message: 'getting error'});
		});
	},
	//
	GetTodoList3: ((req, res, next) =>{
	 	classObj.GetJson3(req,next);
	}, (req, res) => {
 		res.json(req.params.myList);
 	}),
	//
	PostIndex: (req : express.Request, res : express.Response) => { 
		console.log('Post Index Todo');
		classObj.Post(req.body);
		RenderObject.model = TodoItem.TodoArray;
		res.render('pages/layout', RenderObject);
	},
	//
	PostCreate: (req : express.Request, res : express.Response) => {
			classObj.Post(req.body, ReturnJson(req,res));
	},
	//
	GetDelete: (req : express.Request, res : express.Response) => { 
		classObj.Delete(req.params.id.toString(), ReturnJson(req,res));
	},
	
}


export = Controller;