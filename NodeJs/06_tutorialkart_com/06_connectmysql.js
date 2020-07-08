'use strict';
//connectToMySQL.js - Connect to MySQL database in Node.js
// include mysql module

let mysql = require('mysql');

// create a connection letiable with the details required
let con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "ytzecode", // user name to your mysql database
  password: "ytzecode" // corresponding password
});

// connect to the database.
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
