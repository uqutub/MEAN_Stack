///<reference path="./../../typings/express/express.d.ts"/>

import express = require("express");

//import model
import {ITodoItem, TaskStatus, TodoItem} from "./../model/todo";



var router = express.Router();

//Get
router.get('/', (req, res) => {
	var x = new TodoItem();
	//x.Get();
	res.render('pages/layout', {items: TodoItem.TodoArray, title: "Todo-App", view:"_todo"});
}); 

let querry_to_hash = (querryString: string[]) => {
let j = {}, q: string[] = [];

querryString.forEach(function(entry){
	q = entry.split('=');
	return j[q[0]] = q[1];
});

j['CreatedOn'] = new Date;
j['Status'] = TaskStatus.None

return <ITodoItem>j;
};

//Post
router.post('/', (req, res) => {
	let bodyStr = '';
	
	req.on("data", (chunk) => {
		bodyStr += chunk.toString();
	});
	
	req.on("end", () => {
		let taskObj: ITodoItem = querry_to_hash(bodyStr.split('&'));
		let itemObj = new TodoItem(taskObj);
		//itemObj.Post(taskObj);
		res.render('pages/layout', {items: TodoItem.TodoArray, title: "Todo-App", view:"_todo"});
	});
		
});

//Delete on get req.
router.get('/delete/:id', (req, res) => {
	let x = new TodoItem(); 
	x.Delete(req.params.id.toString());
	
	console.log('req.params.id: ' + req.params.id);
	
	/*
	let bodyStr = '';
	
	req.on("data", (chunk) => {
		bodyStr += chunk.toString();
	});
	
	req.on("end", () => {
		var abc = bodyStr.split('&');
		console.log('0' + abc[0]);
		console.log('1' + abc[1]);
		
		let taskObj: ITodoItem = querry_to_hash(bodyStr.split('&'));
		//let itemObj = new TodoItem(taskObj);
		//itemObj.Post(taskObj);
		res.render('pages/layout', {items: TodoItem.TodoArray, title: "Todo-App", view:"_todo"});
	});
		*/
		res.redirect('/todo/');
	//res.render('pages/layout', {items: TodoItem.TodoArray, title: "Todo-App", view:"_todo"});
});

export = router;