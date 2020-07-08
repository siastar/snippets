'use strict';

// include mysql module
var mysql = require('mysql');

// create a connection variable with the required details
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "ytzecode", // user name to your mysql database
  password: "ytzecode", // corresponding password
  database: "world" // use the specified database
});

// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("SELECT * FROM country ORDER BY IndepYear", function (err, result, fields) {
    // if any error while executing above query, throw error
    // "country" is a table of the "world" DB
    // "IndepYear" is a field of the "country" table

    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});
