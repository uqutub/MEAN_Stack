/// <reference path="./../../../typings/tsd.d.ts" />

import express = require("express");
var router = express.Router();

//Custom Helper
import {ReturnJson, IRenderObject} from './../../helpers/myHelper';

//Creating Render Object 
let RenderObject : IRenderObject = {model: null, title: "Chat-App", view:"_chat"};


//Export Object
let Controller = {
	GetIndex: (req : express.Request, res : express.Response) => {
		//let RenderObject : IRenderObject = {model: TodoItem.TodoArray, title: "Todo-App", view:"_todo"};
		res.render('shared/_layout', RenderObject );
	}
};


export = Controller;