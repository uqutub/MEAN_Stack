/// <reference path="./../../../typings/tsd.d.ts" />
var express = require("express");
var router = express.Router();
//import model
var todo_1 = require("./../../models/todo/todo");
//Custom Helper
var myHelper_1 = require('./../../helpers/myHelper');
//Creating Class Object
var classObj = new todo_1.TodoItem();
//Creating Render Object 
var RenderObject = { model: null, title: "Todo-App", view: "_todo" };
//Export Object
var Controller = {
    GetIndex: function (req, res) {
        RenderObject.model = todo_1.TodoItem.TodoArray;
        res.render('shared/_layout', RenderObject);
    },
    //
    GetTodoList1: function (req, res) {
        classObj.GetJson(myHelper_1.ReturnJson(req, res));
    },
    //
    GetTodoList2: function (req, res) {
        classObj.GetJson2().then(function (data) {
            res.json(data);
        }, function (err) {
            res.json({ status: 404, message: 'getting error' });
        });
    },
    //
    GetTodoList3: (function (req, res, next) {
        classObj.GetJson3(req, next);
    }, function (req, res) {
        res.json(req.params.myList);
    }),
    //
    PostIndex: function (req, res) {
        console.log('Post Index Todo');
        classObj.Post(req.body);
        RenderObject.model = todo_1.TodoItem.TodoArray;
        res.render('pages/layout', RenderObject);
    },
    //
    PostCreate: function (req, res) {
        classObj.Post(req.body, myHelper_1.ReturnJson(req, res));
    },
    //
    GetDelete: function (req, res) {
        classObj.Delete(req.params.id.toString(), myHelper_1.ReturnJson(req, res));
    }
};
module.exports = Controller;
