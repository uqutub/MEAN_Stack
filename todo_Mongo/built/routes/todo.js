///<reference path="./../../typings/express/express.d.ts"/>
var express = require("express");
//import model
var todo_1 = require("./../model/todo");
var router = express.Router();
//Get
router.get('/', function (req, res) {
    var x = new todo_1.TodoItem();
    //x.Get();
    res.render('pages/layout', { items: todo_1.TodoItem.TodoArray, title: "Todo-App", view: "_todo" });
});
var querry_to_hash = function (querryString) {
    var j = {}, q = [];
    querryString.forEach(function (entry) {
        q = entry.split('=');
        return j[q[0]] = q[1];
    });
    j['CreatedOn'] = new Date;
    j['Status'] = todo_1.TaskStatus.None;
    return j;
};
//Post
router.post('/', function (req, res) {
    var bodyStr = '';
    req.on("data", function (chunk) {
        bodyStr += chunk.toString();
    });
    req.on("end", function () {
        var taskObj = querry_to_hash(bodyStr.split('&'));
        var itemObj = new todo_1.TodoItem(taskObj);
        //itemObj.Post(taskObj);
        res.render('pages/layout', { items: todo_1.TodoItem.TodoArray, title: "Todo-App", view: "_todo" });
    });
});
//Delete on get req.
router.get('/delete/:id', function (req, res) {
    var x = new todo_1.TodoItem();
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
module.exports = router;
