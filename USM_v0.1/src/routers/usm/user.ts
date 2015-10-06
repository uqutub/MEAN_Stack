/// <reference path="./../../../typings/tsd.d.ts" />
import express = require("express");
var router : express.Router = express.Router();

//import controller
import * as controller from "./../../controllers/usm/user";

router.get('/', controller.GetIndex); 

router.get('/user.json', controller.GetUserList); 

router.post('/create/', controller.PostCreate);

router.put('/edit/', controller.PostEdit);

router.delete('/delete/:id', controller.Delete);

router.get('/edit/:id',controller.GetEdit);

export = router;