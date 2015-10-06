/// <reference path="./../../../typings/tsd.d.ts" />

//import moongose
import mongoose = require('mongoose'); 	//import mongodb

//Custom Helper
import {callBack_exResponse} from './../../helpers/myHelper';

export interface IUser{
	FirstName: string;
	LastName: string;
	UserName: string;
	Email: string;
	Password: string;
	Address: string;
}

export class UserCls {
	
	//Save
	Add(user: IUser, cb: callBack_exResponse){
		let x = new UserCollection(user);
		x.save(function(err){
			if(err){
				cb(err);
			}
			cb(null);
		});
	};
	
	//Edit
	Edit(id: string,  obj: IUser, callBack:callBack_exResponse){
		var query = {'_id': id};
		 UserCollection.update(query, obj,  (err, row)=>{
			 if(err) {
				callBack(err, null);
			}
			console.log('Row: '+JSON.stringify(row));
			console.log('Err: '+JSON.stringify(err));
			callBack(null, row);
			
		})
	};
	
	//Edit2 //Get User by userid
	Edit2(id: string, callBack:callBack_exResponse){
		//Find By Id
		UserCollection.findById(id, function (err, obj) {
			if(err) {
				callBack(err, null);
			}
			console.log(JSON.stringify(obj));
			callBack(null, obj);
		});
	}// closing Edit2
	
	//Delete
	Delete(index: string, cb: callBack_exResponse){
	UserCollection.findById(index,(err, obj) => {
		//checking if obj found or not
		//if not
		if(err){
			cb(err);
		}
		//else (if found then remove)
		UserCollection.remove(obj, (err) => {
				//if any err
				if(err){
					cb(err);
				}
				
				//on succesfuly delete
				cb(null);
			});
			//cb(null);
		});
	//TodoItem.TodoArray.splice(index,1);
	};
	
	//Method 1 without return keybord using callback function
	GetJson(callBack: callBack_exResponse) {
		UserCollection.find((err, obj)=>{
			if(err) {
				callBack(err, null);
			}
			callBack(null, obj);
		});
	};

	
} //Class End

//Creating Schema for MongoDB
let userSchema = new mongoose.Schema({									//Create Schema for Todo Collection
	FirstName: {type: String, required: true}
	,LastName: {type: String, trim: true}
	,UserName: {type: String, trim: true}
	,Email: {type: String, lowercase: true, trim: true}
	,Password: String
	,Address: {type: String, trim: true}
	,Age: {type: Number, min: 18, max: 65, default: 20}
	,IsActive: Boolean
	//,binary: Buffer
}); 
export let UserCollection = mongoose.model("User", userSchema);			//Create Collection with the name of Todo (in db it shows Todos)