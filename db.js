var mysql = require('mysql');
var config = require('./myconfig');

var connection = mysql.createConnection({
	host : config.db.host,
	user : config.db.user,
	password : config.db.password,
	database : config.db.database
});

connection.connect(function(err){
	if(err){
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;