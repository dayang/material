var mysql = require('mysql');
var config = require('./myconfig');

var connection = mysql.createConnection(config.db);

module.exports = connection;