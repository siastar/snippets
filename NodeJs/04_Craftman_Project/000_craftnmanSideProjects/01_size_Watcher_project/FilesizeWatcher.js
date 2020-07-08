'use strict';

let fs = require('fs');
/*load fs "file system" module
https://www.w3schools.com/nodejs/nodejs_filesystem.asp*/

let FilesizeWatcher = function(path) {
/*we start to build a constructor function for FilesizeWatcher objects.
They are created by passing a path to watch as a parameter.*/

                        let self = this;
/*we assign the object instance variable to a local self variable -
this way we can access our instantiated object within callback
functions, where this would point to another object.*/

                        self.callbacks = {};
/*We then create the self.callbacks object - we are going to use
this as an associative array where we will store the callback to
each event.*/

                        if (/^\//.test(path) === false) {
                          self.callbacks['error']('Path does not start with a slash');
                          return;
                        }
/*Next, on line 10, we check if the given path starts with a slash using
a regular expression - if it doesn’t, we trigger the callback associated
with the error event.*/

                        fs.stat(path, function(err, stats) {
                                        self.lastfilesize = stats.size;
                                      });
/*If the check succeeds, we start an initial stat operation in order to
store the file size of the given path - we need this base value in order
to recognize future changes in file size.*/

                        self.interval = setInterval(
/*We set up a 1-second interval where we call stat on every
interval iteration and compare the current file size with the last known file size.*/
                          function() {
                            fs.stat(path, function(err, stats) {

                                            if (stats.size > self.lastfilesize) {
                                              self.callbacks['grew'](stats.size - self.lastfilesize);
                                              self.lastfilesize = stats.size;
                                            }
/*handles the case where the file grew in size, calling the event
handler callback associated with the grew event, the new file size is saved
in "self.lastfilesize" .*/
                                            if (stats.size < self.lastfilesize) {
                                              self.callbacks['shrank'](self.lastfilesize - stats.size);
                                              self.lastfilesize = stats.size;
                                            }
/*handles the case where the file shrank in size, calling the event
handler callback associated with the grew event, the new file size is saved
in "self.lastfilesize" .*/
                                          }, 1000);//1000 milliseconds interval
                          });
                      }; //end of FilesizeWatcher function

FilesizeWatcher.prototype.on =  function(eventType, callback) {
                                  this.callbacks[eventType] = callback;
                                };
/*Event handlers can be registered using the FilesizeWatcher.on method
 which is defined on line 34. In our implementation, all it does is to
 store the callback under the event name in our callbacks object.*/

FilesizeWatcher.prototype.stop =  function() {
                                    clearInterval(this.interval);
                                  };
/*defines the stop method which cancels the interval we set up in
the constructor function.*/

module.exports = FilesizeWatcher;
