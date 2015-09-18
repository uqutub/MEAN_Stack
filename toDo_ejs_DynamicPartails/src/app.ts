///<reference path="./../typings/node/node.d.ts"/>
///<reference path="./../typings/express/express.d.ts"/>
///<reference path="./../typings/jquery/jquery.d.ts"/>

//import http = require("http");
import path = require('path');
import express = require("express");

var app : express.Express = express();

// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/../public')));

//Middle Ware
app.use((req, res, next)=>{
console.log('Method: ' + req.method.toString() + ' - ' + req.url.toString());

/*if(req.method == 'POST')
{
console.log('potssss');
}*/

next();
});

app.get('/', (req, res) => {
res.render('pages/layout', {title: "Todo-App", view:"_index"});
}); 

app.get('/todo', (req, res) => {
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


app.post('/todo', (req, res) => {
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



var port: number = process.env.PORT || 4000;
var server = app.listen(port, () => {
var listeningPort: number = server.address().port;
console.log('The server is listening on port: ' + listeningPort);
});




//Classes & Interface

interface ITodoItem{
Task: string;
CreatedBy: string;
CreatedOn: Date;
Status: TaskStatus;
}

enum TaskStatus{
None,
Complete,
Cancel,
Pending
}

class TodoItem {

static TodoArray: ITodoItem[] = []
TodItem: ITodoItem;

//constructor if required
constructor(item: ITodoItem){
	this.Post(item);
};


Post(item: ITodoItem): void {
TodoItem.TodoArray.push(item)
}

Get(){
return TodoItem.TodoArray;	
};

Put(item: ITodoItem){

}

Delete(index: number){
TodoItem.TodoArray.splice(index,1);
}

}



