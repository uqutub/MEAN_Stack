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
exports.TodoItem = TodoItem;
