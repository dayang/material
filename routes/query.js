var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../myconfig');

router.post('/',function(req, res, next){
	req.session.elements = req.body.elementArray;console.log(req.session.elements)
	res.render('materialTable');
});

router.get('/queryTable', function(req, res, next){

	var elements = [];
	if(req.session.elements){
		elements = req.session.elements.trim().split(' ');
	}
	if(elements.length > 0){
		var connection = mysql.createConnection(config.db);
		connection.connect(function(err){
			if(err){
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'select formula_id from formulacompose where element=\'' + elements[0] + '\'';

			for (var i = 1; i < elements.length; i++){
				sql = 'select formula_id from formulacompose where formula_id in (' + sql + ') and element=\'' + elements[i] + '\'';
			}

			sql = 'select Materials_Id,Formula,Spacegroup,\
		 		Formation_Energy,E_Above_Hull,Band_Gap,Nsites,Density,\
		 		Volume,zip_dir,kpoint_dir from materialsproject where id in (' + sql + ')';

			connection.query(sql,function(err,rows){
				connection.end();
				if(err){
					return console.log(err);
				}
				res.json({data : rows, num : rows.length});
			});
		});
	}
})

module.exports = router;