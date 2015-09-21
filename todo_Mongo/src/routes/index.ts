///<reference path="./../../typings/express/express.d.ts"/>

import express = require("express");
var router = express.Router();


router.get('/', (req, res) => {
res.render('pages/layout', {title: "Todo-App", view:"_index"});
}); 


export = router;