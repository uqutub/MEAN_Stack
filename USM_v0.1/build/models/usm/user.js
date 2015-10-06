/// <reference path="./../../../typings/tsd.d.ts" />
//import moongose
var mongoose = require('mongoose'); //import mongodb
var UserCls = (function () {
    function UserCls() {
    }
    //Save
    UserCls.prototype.Add = function (user, cb) {
        var x = new exports.UserCollection(user);
        x.save(function (err) {
            if (err) {
                cb(err);
            }
            cb(null);
        });
    };
    ;
    //Edit
    UserCls.prototype.Edit = function (id, obj, callBack) {
        var query = { '_id': id };
        exports.UserCollection.update(query, obj, function (err, row) {
            if (err) {
                callBack(err, null);
            }
            console.log('Row: ' + JSON.stringify(row));
            console.log('Err: ' + JSON.stringify(err));
            callBack(null, row);
        });
    };
    ;
    //Edit2 //Get User by userid
    UserCls.prototype.Edit2 = function (id, callBack) {
        //Find By Id
        exports.UserCollection.findById(id, function (err, obj) {
            if (err) {
                callBack(err, null);
            }
            console.log(JSON.stringify(obj));
            callBack(null, obj);
        });
    }; // closing Edit2
    //Delete
    UserCls.prototype.Delete = function (index, cb) {
        exports.UserCollection.findById(index, function (err, obj) {
            //checking if obj found or not
            //if not
            if (err) {
                cb(err);
            }
            //else (if found then remove)
            exports.UserCollection.remove(obj, function (err) {
                //if any err
                if (err) {
                    cb(err);
                }
                //on succesfuly delete
                cb(null);
            });
            //cb(null);
        });
        //TodoItem.TodoArray.splice(index,1);
    };
    ;
    //Method 1 without return keybord using callback function
    UserCls.prototype.GetJson = function (callBack) {
        exports.UserCollection.find(function (err, obj) {
            if (err) {
                callBack(err, null);
            }
            callBack(null, obj);
        });
    };
    ;
    return UserCls;
})();
exports.UserCls = UserCls; //Class End
//Creating Schema for MongoDB
var userSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, trim: true },
    UserName: { type: String, trim: true },
    Email: { type: String, lowercase: true, trim: true },
    Password: String,
    Address: { type: String, trim: true },
    Age: { type: Number, min: 18, max: 65, default: 20 },
    IsActive: Boolean
});
exports.UserCollection = mongoose.model("User", userSchema); //Create Collection with the name of Todo (in db it shows Todos)
