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

// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("SELECT * FROM country where Code=ASS", function (err, result, fields) {
/*
    // if any error while executing above query, throw error

    //"country" is a table of "world" DB
    //"GNP" is a field of the "country table"

    RowDataPacket {
        Code: 'BRB',
        Name: 'Barbados',
        Continent: 'North America',
        Region: 'Caribbean',
        SurfaceArea: 430,
        IndepYear: 1966,
        Population: 270000,
        LifeExpectancy: 73,
        GNP: 2223,
        GNPOld: 2186,
        LocalName: 'Barbados',
        GovernmentForm: 'Constitutional Monarchy',
        HeadOfState: 'Elisabeth II',
        Capital: 174,
        Code2: 'BB' },
*/
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});
