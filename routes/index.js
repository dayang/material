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

router.get('/zip/:file',function(req, res, next){
	res.download('zip/'+req.params.file);
});

router.get('/kpoints/:file',function(req, res, next){
	console.log(req.params.file)
	res.download('kpoints/'+ req.params.file);
});

module.exports = router;
