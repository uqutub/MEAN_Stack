///<reference path="./../../typings/tsd.d.ts"/>

//import moongose
import mongoose = require('mongoose'); //import mongodb
import q = require('q');
import {TodoEntity} from './mongoose';

export interface ITodoItem{
Task: string;
CreatedBy: string;
CreatedOn: Date;
Status: TaskStatus;
}

export enum TaskStatus{
None,
Complete,
Cancel,
Pending
}


export class TodoItem implements ITodoItem{
	Task: string;
	CreatedBy: string;
	CreatedOn: Date;
	Status: TaskStatus;

static TodoArray: ITodoItem[] = [];
//TodItem: ITodoItem;

//constructor if required
constructor(item?: ITodoItem){
	if(item){ this.Post(item); }
	
	this.Get();
};


Post(item: ITodoItem): void {
	TodoItem.TodoArray.push(item)

	//save into DB
	let x = new TodoEntity(item);
	x.save(function(err){
		if(err){ console.log('err db'); }
		
		console.log('successful db');
	});
};

Get(){
	TodoEntity.find((err, obj)=>{
		if(err){ console.log('todo get: err'); }
		console.log('todo get: loading obj')
		TodoItem.TodoArray = obj
	});
};

//Method 1 without return keybord using callback function
GetJson(callBack: (err, obj) => void) {
	return TodoEntity.find((err, obj)=>{
		if(err) { callBack(err, null); }
		callBack(null, obj);
	});
};

//method 02 using Promise Pattren
GetJson2(){
	 var deferred = q.defer();
	 TodoEntity.find((err, obj)=>{
		if(err) { deferred.reject(err);	}
		deferred.resolve(obj);
	});
	return deferred.promise;
};


Put(item: ITodoItem){

};

Delete(index: string){
TodoEntity.findById(index,(err, obj) => {
	if(err){ console.log('delete find: err'); }
	TodoEntity.remove(obj, (err) => { 
		if(err){ console.log('delete remove: err'); }
		
		console.log('delete remove: successful');
	});
	console.log('delete find: successful');
});

	
//TodoItem.TodoArray.splice(index,1);
};


}
