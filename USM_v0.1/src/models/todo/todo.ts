/// <reference path="./../../../typings/tsd.d.ts" />

//import moongose
import mongoose = require('mongoose'); 	//import mongodb
import q = require('q');				//if using promise pattren

//Custom Helper
import {callBack_exResponse} from './../../helpers/myHelper';

//Creating Schema for MongoDB
let todoSchema = new mongoose.Schema({									//Create Schema for Todo Collection
	Task: String,
	CreatedBy: String,
	CreatedOn: {type: Date, default: Date.now},
	Status: Number
}); 
export let TodoCollection = mongoose.model("Todo", todoSchema);			//Create Collection with the name of Todo (in db it shows Todos)



export interface ITodoItem {						//Interface for TodoItem
	Task: string;
	CreatedBy: string;
	CreatedOn: Date;
	Status: TaskStatus;
}

export enum TaskStatus {							//enum for task status (optional)
	None,
	Complete,
	Cancel,
	Pending
}


export class TodoItem implements ITodoItem {		//create class for TodoItem
	
	Task: string;
	CreatedBy: string;
	CreatedOn: Date;
	Status: TaskStatus;
	

	static TodoArray: ITodoItem[] = [];


	//constructor if required
	constructor(item?: ITodoItem){
		this.Get((err, obj)=>{
			TodoItem.TodoArray = obj;
			//console.log(JSON.stringify(TodoItem.TodoArray))
		});
	};


	Post(item: ITodoItem, cb?: callBack_exResponse): void {
		
		if(cb){
			TodoItem.TodoArray.push(item)
			//save into DB
			let x = new TodoCollection(item);
			x.save(function(err){
				if(err){
					cb(err)
				}
				cb(null)
			});
		}// if callback function closng
		else{ // if not callback
			let x = new TodoCollection(item);
			x.save(function(err){
				if(err){
					console.log('Err: Post Todo: ' + err);
				}
				console.log('Successful: Post Todo');
			});
		}
	};

	Get(callBack: (err, obj) => void){
		TodoCollection.find((err, obj)=>{
			if(err)	{
				callBack(err, null);
			}
			//console.log('todo get: loading obj')
			callBack(null, obj);
		});
	};

	//Method 1 without return keybord using callback function
	GetJson(callBack: (err, obj) => void) {
		TodoCollection.find((err, obj)=>{
			if(err) {
				callBack(err, null);
			}
			callBack(null, obj);
		});
	};

	//method 02 using Promise Pattren
	GetJson2(){
		 var deferred = q.defer();
		 TodoCollection.find((err, obj)=>{
			if(err) {
				deferred.reject(err) // rejects the promise with `er` as the reason
			}
			deferred.resolve(obj) // fulfills the promise with `data` as the value
		});
		return deferred.promise // the promise is returned
	};

	//method 03 passing next parameter
	GetJson3(req, next){
		 TodoCollection.find((err, result)=>{
		if(err){ return false;}
			req.params.myList = result;
			next()
		});
	};

	Put(item: ITodoItem){
			
	};

	Delete(index: string, cb: callBack_exResponse){
	TodoCollection.findById(index,(err, obj) => {
		if(err){
			cb(err);
		}
		TodoCollection.remove(obj, (err) => {
				if(err){
					cb(err);
				}
				cb(null);
			});
			//cb(null);
		});
	};

} //closing class