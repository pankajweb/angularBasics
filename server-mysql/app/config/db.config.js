const env = require('./env.js');
var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : env.host,
    user     : env.username,
    password : env.password,
    database : env.database
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

module.exports = connection;