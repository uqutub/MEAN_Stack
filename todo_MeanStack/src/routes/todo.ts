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

//method 01 calling callback without return keyword
router.get('/todo.json', (req, res) => {
	var x = new TodoItem();
	x.GetJson((err, obj)=>{
		if(err){ res.json({status: 404, message: 'getting error'}); }
		res.json(obj);
	});
}); 

//method 02 using Promise Pattren
router.get('/todo.json2', (req, res) => {
	var x = new TodoItem();
	x.GetJson2().then((data)=>{
		res.json(data);
	},(err)=>{
		res.json({status: 404, message: 'getting error'});
	});
}); 


//Function for getting Post Data and return object
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

//Post From Server (EJS)
router.post('/', (req, res) => {
	console.log('body parser: ' + JSON.stringify(req.body));
	let itemObj = new TodoItem(req.body);
	res.render('pages/layout', {items: TodoItem.TodoArray, title: "Todo-App", view:"_todo"});
});

router.post('/create/', (req, res)=>{
	console.log('toDoCreate POTS: '+ JSON.stringify(req.body));
	let itemObj = new TodoItem(req.body);
	res.json({status: "200", message: "Ok fne"})
});

//Delete on get req.
router.get('/delete/:id', (req, res) => {
	let x = new TodoItem(); 
	x.Delete(req.params.id.toString());
	
	console.log('req.params.id: ' + req.params.id);
	res.redirect('/todo/');
});

export = router;
