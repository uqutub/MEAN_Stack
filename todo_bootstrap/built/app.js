///<reference path="./../typings/node/node.d.ts"/>
///<reference path="./../typings/express/express.d.ts"/>
///<reference path="./../typings/jquery/jquery.d.ts"/>
//import http = require("http");
var path = require('path');
var express = require("express");
var app = express();
// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/../public')));
//Middle Ware
app.use(function (req, res, next) {
    console.log('Method: ' + req.method.toString() + ' - ' + req.url.toString());
    /*if(req.method == 'POST')
    {
    console.log('potssss');
    }*/
    next();
});
app.get('/', function (req, res) {
    res.render('pages/index', { title: "Todo-App" });
});
app.get('/todo', function (req, res) {
    res.render('pages/todo', { items: TodoItem.TodoArray, title: "Todo-App" });
});
var querry_to_hash = function (querryString) {
    var j = {}, q = [];
    querryString.forEach(function (entry) {
        q = entry.split('=');
        return j[q[0]] = q[1];
    });
    j['CreatedOn'] = new Date;
    j['Status'] = TaskStatus.None;
    return j;
};
app.post('/todo', function (req, res) {
    var bodyStr = '';
    req.on("data", function (chunk) {
        bodyStr += chunk.toString();
    });
    req.on("end", function () {
        var taskObj = querry_to_hash(bodyStr.split('&'));
        var itemObj = new TodoItem(taskObj);
        //itemObj.Post(taskObj);
        res.render('pages/todo', { items: TodoItem.TodoArray, title: "Todo-App" });
    });
});
var port = process.env.PORT || 4000;
var server = app.listen(port, function () {
    var listeningPort = server.address().port;
    console.log('The server is listening on port: ' + listeningPort);
});
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["None"] = 0] = "None";
    TaskStatus[TaskStatus["Complete"] = 1] = "Complete";
    TaskStatus[TaskStatus["Cancel"] = 2] = "Cancel";
    TaskStatus[TaskStatus["Pending"] = 3] = "Pending";
})(TaskStatus || (TaskStatus = {}));
var TodoItem = (function () {
    //constructor if required
    function TodoItem(item) {
        this.Post(item);
    }
    ;
    TodoItem.prototype.Post = function (item) {
        TodoItem.TodoArray.push(item);
    };
    TodoItem.prototype.Get = function () {
        return TodoItem.TodoArray;
    };
    ;
    TodoItem.prototype.Put = function (item) {
    };
    TodoItem.prototype.Delete = function (index) {
        TodoItem.TodoArray.splice(index, 1);
    };
    TodoItem.TodoArray = [];
    return TodoItem;
})();
