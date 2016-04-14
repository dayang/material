var mysql = require('mysql');
var config = require('./myconfig');

var connection = mysql.createConnection({
	host : config.db.host,
	user : config.db.user,
	password : config.db.password,
	database : config.db.database
});

module.exports = connection;