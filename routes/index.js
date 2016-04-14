var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index');
});
router.get('/meterialTable',function (req,res,next) {
    console.log("sss");
    res.render('meterialTable');
});

module.exports = router;
