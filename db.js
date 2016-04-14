var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'host',
	user : 'user',
	password : 'password',
	database : 'database'
});

connection.connect(function(err){
	if(err){
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;