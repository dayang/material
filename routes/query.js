var express = require('express');
var router = express.Router();
var connection = require('../db');

router.post('/',function(req, res, next){
	var elements = req.body.elementArray.trim().split(' ');

	var con = '';
	for(var i = 0; i < elements.length; i++){
		con += 'binary formula like \'%'+elements[i] + '%\'';
		con += (i < elements.length - 1) ? ' and ' : '';
	};

	// console.log(con);

	connection.query('select Materials_Id,Formula,Spacegroup,\
		Formation_Energy,E_Above_Hull,Band_Gap,Nsites,Density,\
		Volume,zip_dir,kpoint_dir from materialsproject where ' + con,function(err,rows){
		return res.json({data :rows});
	});
});

module.exports = router;