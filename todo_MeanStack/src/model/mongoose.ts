///<reference path="./../../typings/tsd.d.ts"/>

import mongoose = require('mongoose'); //import mongodb
//import {ITodoItem, TaskStatus, TodoItem} from "./todo";

//var c : ITodoItem;
//var todoSchema = new mongoose.Schema(c);


var todoSchema = new mongoose.Schema({
	Task: String,
	CreatedBy: String,
	CreatedOn: {type: Date, default: Date.now},
	Status: Number
}); 

export let TodoEntity = mongoose.model("Todo", todoSchema);