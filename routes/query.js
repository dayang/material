var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../myconfig');

router.post('/',function(req, res, next){
	console.log(req.body);
	req.session.elements = req.body.elementArray;
	req.session.sn = req.body['Spacegroup_Number[]'];
	req.session.eah = req.body['E_Above_Hull[]'];
	req.session.bg = req.body['Band_Gap[]'];
	res.render('materialTable',{ 
		caption : req.session.elements,
		capSN: req.session.sn,
		capEAH: req.session.eah,
		capBG: req.session.bg});
});

router.post('/initEAH',function (req,res,next) {
	var connection = mysql.createConnection(config.db);
	connection.connect(function(err){
		if(err){
			console.error('error connecting: ' + err.stack);
			return;
		}
		var sql = 'select distinct E_Above_Hull from materialsproject';
		connection.query(sql,function (err,rows1) {
			if(err){
				console.log(err);
			}
			return res.json({E_Above_Hull:rows1});
		});
	});
});

router.post('/initBG',function (req,res,next) {
	var connection = mysql.createConnection(config.db);
	connection.connect(function(err){
		if(err){
			console.error('error connecting: ' + err.stack);
			return;
		}
		var sql = 'select distinct Band_Gap from materialsproject';
		connection.query(sql,function (err,rows2) {
			if(err){
				console.log(err);
			}
			return res.json({Band_Gap:rows2});
		});
	});
});

router.post('/initSN',function (req,res,next) {
	var connection = mysql.createConnection(config.db);
	connection.connect(function(err){
		if(err){
			console.error('error connecting: ' + err.stack);
			return;
		}
		var sql = 'select distinct Spacegroup_Number from materialsproject';
		connection.query(sql,function (err,rows3) {
			if(err){
				console.log(err);
			}
			return res.json({Spacegroup_Number:rows3});
		});
	});
});

router.post('/initSeletor',function (req,res,next) {
	var connection = mysql.createConnection(config.db);
	connection.connect(function(err){
		if(err){
			console.error('error connecting: ' + err.stack);
			return;
		}
		var sql = 'select distinct E_Above_Hull from materialsproject';
		connection.query(sql,function (err,rows1) {
			if(err){
				console.log(err);
			}
			var sql = 'select distinct Band_Gap from materialsproject';
			connection.query(sql,function (err,rows2) {
				if(err){
					console.log(err);
				}
				//console.log(rows2);
				var sql = 'select distinct Spacegroup_Number from materialsproject';
				connection.query(sql,function (err,rows3) {
					if(err){
						console.log(err);
					}
					return res.json({E_Above_Hull:rows1,Band_Gap:rows2,Spacegroup_Number:rows3});
				});
			});
		});
	});
});

router.get('/queryTable', function(req, res, next){
	var elements = [];
	var Spacegroup_Number = req.session.sn;
	var E_Above_Hull = req.session.eah;
	var Band_Gap = req.session.bg;
	if(req.session.elements){
		elements = req.session.elements.trim().split(' ');
	}
	
	var sqlele = 'true';
	var sqlsn = 'true';
	var sqleah = 'true';
	var sqlbg = 'true';
	if(Spacegroup_Number != 'all'){sqlsn = 'Spacegroup_Number = '+Spacegroup_Number;}
	if(E_Above_Hull != 'all'){sqleah = 'E_Above_Hull = '+E_Above_Hull;}
	if(Band_Gap != 'all'){sqlbg = 'Band_Gap = '+Band_Gap;}
	if(elements.length > 0){
			sqlele = 'select formula_id from formulacompose where element=\'' + elements[0] + '\'';
			for (var i = 1; i < elements.length; i++){
				sqlele = 'select formula_id from formulacompose where formula_id in (' + sqlele + ') and element=\'' + elements[i] + '\'';
			}
			sqlele = 'id in (' + sqlele + ')';
	}
	
	var connection = mysql.createConnection(config.db);
	connection.connect(function(err){
		if(err){
			console.error('error connecting: ' + err.stack);
			return;
		}
		// sql = 'select Materials_Id,Formula,Spacegroup,\
		// 			Formation_Energy,E_Above_Hull,Band_Gap,Nsites,Density,\
		// 			Volume,zip_dir,kpoint_dir from materialsproject where(' + sqlele + ' and ' + sqlbg +  ' and ' + sqleah + ' and '+ sqlsn + ')';		
		sql = 'select * from materialsproject where(' + sqlele + ' and ' + sqlbg +  ' and ' + sqleah + ' and '+ sqlsn + ')';		

		console.log(sql);
		connection.query(sql,function(err,rows){
			connection.end();
			if(err){
				return console.log(err);
			}
			for(var i = 0;i < rows.length; i++){
				if(rows[i].zip_dir!==null){
					rows[i].zip_dir = '<a href="'+ rows[i].zip_dir + '">下载</a>';
				}
				if(rows[i].kpoint_dir!==null){
					rows[i].kpoint_dir = '<a href="'+ rows[i].kpoint_dir + '">下载</a>';
				}
			}
			res.json({data : rows, num : rows.length});
		});
	});
});

module.exports = router;