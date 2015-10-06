/// <reference path="./../../../typings/tsd.d.ts" />
var express = require("express");
var router = express.Router();
//import controller
var controller = require("./../../controllers/usm/user");
router.get('/', controller.GetIndex);
router.get('/user.json', controller.GetUserList);
router.post('/create/', controller.PostCreate);
router.put('/edit/', controller.PostEdit);
router.delete('/delete/:id', controller.Delete);
router.get('/edit/:id', controller.GetEdit);
module.exports = router;
