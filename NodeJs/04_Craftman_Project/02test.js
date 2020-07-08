'use strict';

let  fs = require('fs');
let stream = fs.createReadStream('textfile1.txt');

/*
we create a read stream that will start
to retrieve the contents of file tectfile.txt
The call to fs.createReadStream does not take
a function argument to use it as a callback.
Instead, it returns an object, which we assign as
the value of the variable stream.
*/

stream.on('data', function(data) {
                    console.log('Received data: ' + data);
                  }
          );
/*
we attach a callback to one type of events the
ReadStream emits: data events
*/

stream.on('end',  function() {
                    console.log('End of file has been reached');
                  }
          );
/*
we attach another callback to another type of event the
ReadStream emits: the endevent
*/
