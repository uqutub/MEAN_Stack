/// <reference path="./../../../typings/tsd.d.ts" />
//import model
var user_1 = require("./../../models/usm/user");
//Custom Helpers
var myHelper_1 = require('./../../helpers/myHelper');
//Creating Render Object
var RenderObject = { model: null, title: 'USM-App', view: '_user' };
//Creating Class Object
var classObj = new user_1.UserCls();
var userCtrl = {
    //Get Index/HomePage of User
    GetIndex: function (req, res) {
        res.render('shared/_layout', RenderObject);
    },
    //Get User in Json Format
    GetUserList: function (req, res) {
        classObj.GetJson(myHelper_1.ReturnJson(req, res));
    },
    //
    PostCreate: function (req, res) {
        classObj.Add(req.body, myHelper_1.ReturnJson(req, res));
    },
    //Post Edit
    PostEdit: function (req, res) {
        classObj.Edit(req.body._id, req.body, myHelper_1.ReturnJson(req, res));
    },
    //Get Edit
    GetEdit: function (req, res) {
        if (req.params.id) {
            classObj.Edit2(req.params.id, myHelper_1.ReturnJson(req, res));
        }
        else {
            res.json({ status: "404", message: "id not find" });
        }
    },
    // Post Delete
    Delete: function (req, res) {
        if (req.params.id) {
            classObj.Delete(req.params.id.toString(), myHelper_1.ReturnJson(req, res));
        }
    }
};
module.exports = userCtrl;
