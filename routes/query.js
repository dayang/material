var express = require('express');
var router = express.Router();
//var connection = require('../db');

router.post('/',function(req, res, next){
	var elements = req.body.elementArray.split(' ');

	var con = '';
	for(var i = 0; i < elements.length; i++){
		con += 'binary formuler='+elements[i];
		con += (i < elements.length - 1) ? ' and ' : '';
	};

	connection.query('select * from where ' + con,function(err,rows){
		return res.json(rows);
	});
});

module.exports = router;