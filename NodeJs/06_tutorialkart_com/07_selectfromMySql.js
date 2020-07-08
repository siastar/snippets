'use strict';

// Node.js MySQL SELECT FROM query Example
// include mysql module
let mysql = require('mysql');

// create a connection letiable with the required details
let con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "ytzecode", // user name to your mysql database
  password: "ytzecode", // corresponding password
  database: "world" // use the specified "world" database imported in mysql
});

// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("SELECT * FROM country", function (err, result, fields) {
    // "country" is a table in the "world" DB (a popular dummy DB)
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});
