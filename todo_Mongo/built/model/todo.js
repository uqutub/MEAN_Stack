///<reference path="./../../typings/tsd.d.ts"/>
var mongoose_1 = require('./mongoose');
(function (TaskStatus) {
    TaskStatus[TaskStatus["None"] = 0] = "None";
    TaskStatus[TaskStatus["Complete"] = 1] = "Complete";
    TaskStatus[TaskStatus["Cancel"] = 2] = "Cancel";
    TaskStatus[TaskStatus["Pending"] = 3] = "Pending";
})(exports.TaskStatus || (exports.TaskStatus = {}));
var TaskStatus = exports.TaskStatus;
var TodoItem = (function () {
    //TodItem: ITodoItem;
    //constructor if required
    function TodoItem(item) {
        this.Get();
        if (item) {
            this.Post(item);
        }
    }
    ;
    TodoItem.prototype.Post = function (item) {
        TodoItem.TodoArray.push(item);
        //save into DB
        var x = new mongoose_1.Todo(item);
        x.save(function (err) {
            if (err) {
                console.log('err db');
            }
            console.log('successful db');
        });
    };
    ;
    TodoItem.prototype.Get = function () {
        mongoose_1.Todo.find(function (err, obj) {
            if (err) {
                console.log('get: err');
            }
            console.log('get: loading obj');
            TodoItem.TodoArray = obj;
        });
        //return TodoItem.TodoArray;	
    };
    ;
    TodoItem.prototype.Put = function (item) {
    };
    ;
    TodoItem.prototype.Delete = function (index) {
        mongoose_1.Todo.findById(index, function (err, obj) {
            if (err) {
                console.log('delete find: err');
            }
            mongoose_1.Todo.remove(obj, function (err) {
                if (err) {
                    console.log('delete remove: err');
                }
                console.log('delete remove: successful');
            });
            console.log('delete find: successful');
        });
        //TodoItem.TodoArray.splice(index,1);
    };
    ;
    TodoItem.TodoArray = [];
    return TodoItem;
})();
exports.TodoItem = TodoItem;
