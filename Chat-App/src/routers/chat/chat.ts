/// <reference path="./../../../typings/tsd.d.ts" />
import express = require("express");
var router : express.Router = express.Router();

//import * as todoRouter from "./../router"

//import controller
import * as controller from "./../../controllers/chat/chat";

//Get Index
router.get('/', controller.GetIndex); 

export = router;