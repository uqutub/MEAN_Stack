/// <reference path="./../../../typings/tsd.d.ts" />

import express = require("express");

//import model
import {IUser, UserCls} from "./../../models/usm/user";

//Creating Class Object
let classObj = new UserCls();

let userCtrl = {
	//Get Index/HomePage of User
	GetIndex: (req : express.Request, res : express.Response) => {
		res.render('shared/_layout', {items: null, title: "User-App", view:"_user"});	
	},
	//Get User in Json Format
	GetUserList: (req : express.Request, res : express.Response) => {
		classObj.GetJson((err, obj)=>{
			if(err){ res.json({status: 404, message: 'getting error'}); }
			res.json(obj);
		});
	},
	//
	PostCreate: (req : express.Request, res : express.Response) => {
		classObj.Add(req.body);
		res.json({status: "200", message: "Ok fne"})
	},
	//Post Edit
	PostEdit: (req : express.Request, res : express.Response) => {
		classObj.Edit(req.body._id, req.body, (err, row) => {
			if(err){ res.json({status: 404, message: 'getting error'}); }
			res.json({status: "200", message: "Ok fne"});	
		});
	},
	//Get Edit
	GetEdit: (req : express.Request, res : express.Response) => {
		if(req.params.id)
		{
			classObj.Edit2(req.params.id, (err, obj) => {
				if(err){ res.json({status: 404, message: 'getting error'}); }
				res.json({status: "200", message: "Ok fne"});	
			});
		}
		else{
			res.json({status: "404", message: "id not find"});
		}
		
	},
	// Post Delete
	Delete: (req : express.Request, res : express.Response) => {
		if(req.params.id){
			classObj.Delete(req.params.id.toString());
			res.json({status: "200", message: "Ok fne"});	
		}
	}
	
	
};

export = userCtrl;