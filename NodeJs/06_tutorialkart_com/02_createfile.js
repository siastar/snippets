'use strict';

// include node fs module
let fs = require('fs');
let data ='Learn Node FS module';

// writeFile function with filename, content and callback function
fs.writeFile('newfile.txt', data, function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
});
