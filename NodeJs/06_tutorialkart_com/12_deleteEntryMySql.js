'use strict';

// include mysql module
let mysql = require('mysql');

// create a connection letiable with the required details
let con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "ytzecode", // user name to your mysql database
  password: "ytzecode", // corresponding password
  database: "world" // use the specified database
});

// make connection to the database.
con.connect(function(err) {
 if (err) throw err;
 // if connection is successful
 con.query("DELETE FROM country WHERE Population>1907558000", function (err, result, fields) {
   // if any error while executing above query, throw error
   if (err) throw err;
   // if there is no error, you have the result
   console.log(result);
 });
});
