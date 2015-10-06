/// <reference path="./../../../typings/tsd.d.ts" />
//import moongose
var mongoose = require('mongoose'); //import mongodb
var q = require('q'); //if using promise pattren
//Creating Schema for MongoDB
var todoSchema = new mongoose.Schema({
    Task: String,
    CreatedBy: String,
    CreatedOn: { type: Date, default: Date.now },
    Status: Number
});
exports.TodoCollection = mongoose.model("Todo", todoSchema); //Create Collection with the name of Todo (in db it shows Todos)
(function (TaskStatus) {
    TaskStatus[TaskStatus["None"] = 0] = "None";
    TaskStatus[TaskStatus["Complete"] = 1] = "Complete";
    TaskStatus[TaskStatus["Cancel"] = 2] = "Cancel";
    TaskStatus[TaskStatus["Pending"] = 3] = "Pending";
})(exports.TaskStatus || (exports.TaskStatus = {}));
var TaskStatus = exports.TaskStatus;
var TodoItem = (function () {
    //constructor if required
    function TodoItem(item) {
        this.Get(function (err, obj) {
            TodoItem.TodoArray = obj;
            //console.log(JSON.stringify(TodoItem.TodoArray))
        });
    }
    ;
    TodoItem.prototype.Post = function (item, cb) {
        if (cb) {
            TodoItem.TodoArray.push(item);
            //save into DB
            var x = new exports.TodoCollection(item);
            x.save(function (err) {
                if (err) {
                    cb(err);
                }
                cb(null);
            });
        } // if callback function closng
        else {
            var x = new exports.TodoCollection(item);
            x.save(function (err) {
                if (err) {
                    console.log('Err: Post Todo: ' + err);
                }
                console.log('Successful: Post Todo');
            });
        }
    };
    ;
    TodoItem.prototype.Get = function (callBack) {
        exports.TodoCollection.find(function (err, obj) {
            if (err) {
                callBack(err, null);
            }
            //console.log('todo get: loading obj')
            callBack(null, obj);
        });
    };
    ;
    //Method 1 without return keybord using callback function
    TodoItem.prototype.GetJson = function (callBack) {
        exports.TodoCollection.find(function (err, obj) {
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
        exports.TodoCollection.find(function (err, obj) {
            if (err) {
                deferred.reject(err); // rejects the promise with `er` as the reason
            }
            deferred.resolve(obj); // fulfills the promise with `data` as the value
        });
        return deferred.promise; // the promise is returned
    };
    ;
    //method 03 passing next parameter
    TodoItem.prototype.GetJson3 = function (req, next) {
        exports.TodoCollection.find(function (err, result) {
            if (err) {
                return false;
            }
            req.params.myList = result;
            next();
        });
    };
    ;
    TodoItem.prototype.Put = function (item) {
    };
    ;
    TodoItem.prototype.Delete = function (index, cb) {
        exports.TodoCollection.findById(index, function (err, obj) {
            if (err) {
                cb(err);
            }
            exports.TodoCollection.remove(obj, function (err) {
                if (err) {
                    cb(err);
                }
                cb(null);
            });
            //cb(null);
        });
    };
    ;
    TodoItem.TodoArray = [];
    return TodoItem;
})();
exports.TodoItem = TodoItem; //closing class
