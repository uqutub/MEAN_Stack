/// <reference path="./../../../typings/tsd.d.ts" />
var express = require("express");
var router = express.Router();
//import * as todoRouter from "./../router"
//import controller
var controller = require("./../../controllers/chat/chat");
//Get Index
router.get('/', controller.GetIndex);
module.exports = router;
