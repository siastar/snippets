'use strict';

someFunc (function(err){
            if(!err) {
              console.log('someFunc has finished and called me.');
            }
            else {
              console.log('something went wrong.');
            }
          }
        );
