/// <reference path="./../../../typings/tsd.d.ts" />

//import moongose
import mongoose = require('mongoose'); 	//import mongodb
//import * as mongoose from "mongoose"// = require('mongoose'); 	//import mongodb
//import q = require('q');				//if using promise pattren

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
	Add(user: IUser){
		let x = new UserCollection(user);
		x.save(function(err){
			if(err){
				console.log('err db');
			}
			console.log('successful db');
		});
	};
	
	// //Find and Edit
	// app.put('url', function(req, res) {
    //     // use our bear model to find the bear we want
    //     Bear.findById(req.params.bear_id, function(err, bear) {
    //         if (err)
    //             res.send(err);
    //         bear.name = req.body.name;  // update the bears info
    //         // save the bear
    //         bear.save(function(err) {
    //             if (err)
    //                 res.send(err);
    //             res.json({ message: 'Bear updated!' });
    //         });
    //     });
    // });
	
	//Edit
	Edit(id: string,  obj: IUser, callBack:(err, row) => void){
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
	Edit2(id: string, callBack:(err, obj) => void){
		//Find By Id
		UserCollection.findById(id, function (err, obj) {
			if(err) {
				callBack(err, null);
			}
			console.log(JSON.stringify(obj));
			callBack(null, obj);
  		//var subDocument = myDocument.mySubdocuments.id(mySubDocumentId);
		});
	}// closing Edit2
	
	//Delete
	Delete(index: string){
	UserCollection.findById(index,(err, obj) => {
		if(err){
			console.log('delete find: err');
		}
		UserCollection.remove(obj, (err) => {
				if(err){
					console.log('delete remove: err');
				}
				console.log('delete remove: successful');
			});
			console.log('delete find: successful');
		});
	//TodoItem.TodoArray.splice(index,1);
	};
	
	//Method 1 without return keybord using callback function
	GetJson(callBack: (err, obj) => void) {
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
	FirstName: String,
	LastName: String,
	UserName: String,
	Email: String,
	Password: String,
	Address: String,
}); 
export let UserCollection = mongoose.model("User", userSchema);			//Create Collection with the name of Todo (in db it shows Todos)