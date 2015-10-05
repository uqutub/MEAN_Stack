/// <reference path="./../../../typings/tsd.d.ts" />
//import model
var user_1 = require("./../../models/usm/user");
//Creating Class Object
var classObj = new user_1.UserCls();
var userCtrl = {
    //Get Index/HomePage of User
    GetIndex: function (req, res) {
        res.render('shared/_layout', { items: null, title: "User-App", view: "_user" });
    },
    //Get User in Json Format
    GetUserList: function (req, res) {
        classObj.GetJson(function (err, obj) {
            if (err) {
                res.json({ status: 404, message: 'getting error' });
            }
            res.json(obj);
        });
    },
    //
    PostCreate: function (req, res) {
        classObj.Add(req.body);
        res.json({ status: "200", message: "Ok fne" });
    },
    //Post Edit
    PostEdit: function (req, res) {
        classObj.Edit(req.body._id, req.body, function (err, row) {
            if (err) {
                res.json({ status: 404, message: 'getting error' });
            }
            res.json({ status: "200", message: "Ok fne" });
        });
    },
    //Get Edit
    GetEdit: function (req, res) {
        if (req.params.id) {
            classObj.Edit2(req.params.id, function (err, obj) {
                if (err) {
                    res.json({ status: 404, message: 'getting error' });
                }
                res.json({ status: "200", message: "Ok fne" });
            });
        }
        else {
            res.json({ status: "404", message: "id not find" });
        }
    },
    // Post Delete
    Delete: function (req, res) {
        if (req.params.id) {
            classObj.Delete(req.params.id.toString());
            res.json({ status: "200", message: "Ok fne" });
        }
    }
};
module.exports = userCtrl;
