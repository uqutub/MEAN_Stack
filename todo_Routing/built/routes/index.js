///<reference path="./../../typings/express/express.d.ts"/>
var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    res.render('pages/layout', { title: "Todo-App", view: "_index" });
});
module.exports = router;
