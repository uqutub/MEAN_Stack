/// <reference path="./../../typings/tsd.d.ts" />

import express = require('express'); 					//import express module from dafinatelytyped file (d.ts) for routing

var router : express.Router = express.Router();							//Create Router


router.get('/', (req, res) => {
res.render('shared/_layout', {title: "Todo-App", view:"_index"});
}); 

export = router;