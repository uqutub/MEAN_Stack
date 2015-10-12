/// <reference path="./../../../typings/tsd.d.ts" />
var express = require("express");
var router = express.Router();
//Creating Render Object 
var RenderObject = { model: null, title: "Chat-App", view: "_chat" };
//Export Object
var Controller = {
    GetIndex: function (req, res) {
        //let RenderObject : IRenderObject = {model: TodoItem.TodoArray, title: "Todo-App", view:"_todo"};
        res.render('shared/_layout', RenderObject);
    }
};
module.exports = Controller;
