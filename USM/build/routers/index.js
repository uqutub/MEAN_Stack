/// <reference path="./../../typings/tsd.d.ts" />
var express = require('express'); //import express module from dafinatelytyped file (d.ts) for routing
var router = express.Router(); //Create Router
router.get('/', function (req, res) {
    res.render('shared/_layout', { title: "Todo-App", view: "_index" });
});
module.exports = router;
