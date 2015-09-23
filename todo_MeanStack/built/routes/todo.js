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
//method 01 calling callback without return keyword
router.get('/todo.json', function (req, res) {
    var x = new todo_1.TodoItem();
    x.GetJson(function (err, obj) {
        if (err) {
            res.json({ status: 404, message: 'getting error' });
        }
        res.json(obj);
    });
});
//method 02 using Promise Pattren
router.get('/todo.json2', function (req, res) {
    var x = new todo_1.TodoItem();
    x.GetJson2().then(function (data) {
        res.json(data);
    }, function (err) {
        res.json({ status: 404, message: 'getting error' });
    });
});
/*router.get('/todo.json', (req, res) => {
    var x = new TodoItem();
    var obj = x.GetJson();
    
    let cache= [];
        JSON.stringify(obj, (key, value)=>{
            if(typeof value === 'object' && value !== null){
                if(cache.indexOf(value) !== -1){
                    //cirular refernce found, discard key
                    return;
                }
                //store value in our collection
                cache.push(value);
            }
        })
     console.log('GetJson----- obj: ' + JSON.stringify(TodoItem.TodoArray));
        
    
    //console.log('y--: ' + JSON.stringify(y));
    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
    res.json(obj);
    
    //x.Get();
    //res.render('pages/layout', {items: TodoItem.TodoArray, title: "Todo-App", view:"_todo"});
});*/
//Function for getting Post Data and return object
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
//Post From Server (EJS)
router.post('/', function (req, res) {
    console.log('body parser: ' + JSON.stringify(req.body));
    var itemObj = new todo_1.TodoItem(req.body /*{
        Task: req.body.Task,
        CreatedBy: req.body.CreatedBy,
        CreatedOn: new Date,
        Status: TaskStatus.None
    }*/);
    res.render('pages/layout', { items: todo_1.TodoItem.TodoArray, title: "Todo-App", view: "_todo" });
    //Without BodyParser -- Start --
    /*
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
    */
    //Without BodyParser -- End --
});
router.post('/create/', function (req, res) {
    console.log('toDoCreate POTS: ' + JSON.stringify(req.body));
    var itemObj = new todo_1.TodoItem(req.body);
    res.json({ status: "200", message: "Ok fne" });
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
