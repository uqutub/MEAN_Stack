///<reference path="./../../typings/tsd.d.ts"/>

//import moongose
import mongoose = require('mongoose'); //import mongodb

import {Todo} from './mongoose';

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
	this.Get();
	
	if(item)
	{
		this.Post(item);
	}
	
	
};


Post(item: ITodoItem): void {
	
	TodoItem.TodoArray.push(item)

	//save into DB
	let x = new Todo(item);
	x.save(function(err){
		if(err){
			console.log('err db');
		}
		
		console.log('successful db');
	});
	

};

Get(){
	Todo.find((err, obj)=>{
		if(err)
		{
			console.log('get: err')
		}
		
		console.log('get: loading obj')
		TodoItem.TodoArray = obj
	});
//return TodoItem.TodoArray;	
};

Put(item: ITodoItem){

};

Delete(index: string){
Todo.findById(index,(err, obj) => {
	if(err){
		console.log('delete find: err');
	}
	Todo.remove(obj, (err) => {
		if(err){
			console.log('delete remove: err');
		}
		
		console.log('delete remove: successful');
	});
	
	console.log('delete find: successful');
	
});

	
//TodoItem.TodoArray.splice(index,1);
};


}




