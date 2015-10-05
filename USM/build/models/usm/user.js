/// <reference path="./../../../typings/tsd.d.ts" />
//import moongose
var mongoose = require('mongoose'); //import mongodb
var UserCls = (function () {
    function UserCls() {
    }
    //Save
    UserCls.prototype.Add = function (user) {
        var x = new exports.UserCollection(user);
        x.save(function (err) {
            if (err) {
                console.log('err db');
            }
            console.log('successful db');
        });
    };
    ;
    // //Find and Edit
    // app.put('url', function(req, res) {
    //     // use our bear model to find the bear we want
    //     Bear.findById(req.params.bear_id, function(err, bear) {
    //         if (err)
    //             res.send(err);
    //         bear.name = req.body.name;  // update the bears info
    //         // save the bear
    //         bear.save(function(err) {
    //             if (err)
    //                 res.send(err);
    //             res.json({ message: 'Bear updated!' });
    //         });
    //     });
    // });
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
            //var subDocument = myDocument.mySubdocuments.id(mySubDocumentId);
        });
    }; // closing Edit2
    //Delete
    UserCls.prototype.Delete = function (index) {
        exports.UserCollection.findById(index, function (err, obj) {
            if (err) {
                console.log('delete find: err');
            }
            exports.UserCollection.remove(obj, function (err) {
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
    FirstName: String,
    LastName: String,
    UserName: String,
    Email: String,
    Password: String,
    Address: String
});
exports.UserCollection = mongoose.model("User", userSchema); //Create Collection with the name of Todo (in db it shows Todos)
