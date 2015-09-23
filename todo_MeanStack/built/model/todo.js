///<reference path="./../../typings/tsd.d.ts"/>
var q = require('q');
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
        if (item) {
            this.Post(item);
        }
        this.Get();
    }
    ;
    TodoItem.prototype.Post = function (item) {
        TodoItem.TodoArray.push(item);
        //save into DB
        var x = new mongoose_1.TodoEntity(item);
        x.save(function (err) {
            if (err) {
                console.log('err db');
            }
            console.log('successful db');
        });
    };
    ;
    TodoItem.prototype.Get = function () {
        mongoose_1.TodoEntity.find(function (err, obj) {
            if (err) {
                console.log('todo get: err');
            }
            console.log('todo get: loading obj');
            TodoItem.TodoArray = obj;
        });
        //return TodoItem.TodoArray;	
    };
    ;
    //Method 1 without return keybord using callback function
    TodoItem.prototype.GetJson = function (callBack) {
        return mongoose_1.TodoEntity.find(function (err, obj) {
            if (err) {
                callBack(err, null);
            }
            callBack(null, obj);
        });
    };
    ;
    //method 02 using Promise Pattren
    TodoItem.prototype.GetJson2 = function () {
        var deferred = q.defer();
        mongoose_1.TodoEntity.find(function (err, obj) {
            if (err) {
                deferred.reject(err); // rejects the promise with `er` as the reason
            }
            deferred.resolve(obj); // fulfills the promise with `data` as the value
        });
        return deferred.promise; // the promise is returned
    };
    ;
    TodoItem.prototype.Put = function (item) {
    };
    ;
    TodoItem.prototype.Delete = function (index) {
        mongoose_1.TodoEntity.findById(index, function (err, obj) {
            if (err) {
                console.log('delete find: err');
            }
            mongoose_1.TodoEntity.remove(obj, function (err) {
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
