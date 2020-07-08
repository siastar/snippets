'use strict';
//nodejs-write-to-file-example.js
// include file system module

let fs = require('fs');

let data = "Hello 2 !"

// write data to file sample.html
fs.writeFile('newfile.txt',data,
    // callback function that is called after writing file is done
    function(err) {
        if (err) throw err;
        // if no error
        console.log("Data is written to file successfully.")
});
