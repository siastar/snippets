'use strict';

let  fs = require('fs');
let stream = fs.createReadStream('textfilex.txt');
let content ='';

stream.on('error',  function(err) {
                      console.log('Sad panda: ' + err);
                    }
          );

stream.on('data', function(data) {
                    content = content + data;
                  }
          );

stream.on('end',  function() {
                    console.log('all data has been retrieved' + content);
                  }
          );
