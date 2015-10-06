/// <reference path="./../../../typings/tsd.d.ts" />

import express = require("express");

//import model
import {IUser, UserCls} from "./../../models/usm/user";

//Custom Helpers
import {ReturnJson, IRenderObject} from './../../helpers/myHelper';

//Creating Render Object
let RenderObject: IRenderObject = {model: null, title: 'USM-App', view: '_user'};

//Creating Class Object
let classObj = new UserCls();

let userCtrl = {
	//Get Index/HomePage of User
	GetIndex: (req : express.Request, res : express.Response) => {
		res.render('shared/_layout', RenderObject);	
	},
	//Get User in Json Format
	GetUserList: (req : express.Request, res : express.Response) => {
		classObj.GetJson(ReturnJson(req, res));
	},
	//
	PostCreate: (req : express.Request, res : express.Response) => {
		classObj.Add(req.body, ReturnJson(req, res));
	},
	//Post Edit
	PostEdit: (req : express.Request, res : express.Response) => {
		classObj.Edit(req.body._id, req.body, ReturnJson(req, res));
	},
	//Get Edit
	GetEdit: (req : express.Request, res : express.Response) => {
		if(req.params.id) {
			classObj.Edit2(req.params.id, ReturnJson(req, res));
		}
		else{
			res.json({status: "404", message: "id not find"});
		}
	},
	// Post Delete
	Delete: (req : express.Request, res : express.Response) => {
		if(req.params.id){
			classObj.Delete(req.params.id.toString(), ReturnJson(req, res));
		}
	}
};

export = userCtrl;