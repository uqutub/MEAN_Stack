/// <reference path="./../../typings/tsd.d.ts" />

import express = require("express");

//function return json (Call Back Function)
export function ReturnJson(req : express.Request, res : express.Response){

	function exResponse(err: any, obj?: Object) : express.Response;
	function exResponse(err: any, obj?: number) : express.Response;
	function exResponse(err: any, obj?: any) : express.Response {
		//If err return
		if(err){ 
			return res.json({status: 404, message: 'Error: code 10x1'}); 
		}//if err closing
		if(typeof obj == 'object'){
			obj["status"] = 200;
			obj["message"] = ''
			return res.json(obj);
		}//if obj closing
		if(typeof obj == 'number'){
			let sendObj = {status: 200, message: 'Successfully Updated ' + obj.toString() + ' rows'};
			return res.json(sendObj);
		}// if number closing
		//if no err and no obj (like in mongosse add, delete)
		if(!err){
			let sendObj = {status: 200, message: ''};
			return res.json(sendObj);
		}
		//else
		return res.send("Sumthing Going Worng, Contact to your Administrator, Error: code 20x1")
	}// function exResponse closing
	
	return exResponse;
	
}//ReturnJson Closing

//Render Object 
export interface IRenderObject { model: any, title: string; view: string; };

//Callback Response
export type callBack_exResponse = (err: any, obj?: Object | number) => express.Response;


