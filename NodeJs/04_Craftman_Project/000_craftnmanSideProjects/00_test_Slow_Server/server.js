'use strict';
/*dummy server with artificial random latency for testing purposes
This gives us a very simple “echo” server - if we request the
URL http://localhost:8080/getUser?id=4,
we receive {"pathname":"/getUser","id":"4","value":67} as the response.
This is good enough to give us the simulation of a remote
webservice API to play around with.*/

let http = require('http');
/*The HTTP module can create an HTTP server that listens to server
ports and gives a response back to the client.
Use the createServer() method to create an HTTP server:*/
let url = require('url');
/*The URL module splits up a web address into readable parts.*/
let querystring = require('querystring');
/*The Query String module provides a way of parsing the URL query string.*/

http.createServer(function(request, response) {
                    let pathname = url.parse(request.url).pathname;
                    let query = url.parse(request.url).query;
                    let id = querystring.parse(query)['id'];
                    let result = {
                      'pathname': pathname,
                      'id': id,
                      'value': Math.floor(Math.random() * 100)
                    };

                    setTimeout(function() {
                      response.writeHead(200, {"Content-Type": "application/json"});
                      response.end(JSON.stringify(result));
                    }, 2000 + Math.floor(Math.random() * 1000));
                }
).listen( /*end of createServer and begin of listen on port*/
        8080,
        function() {
          console.log('Echo Server listening on port 8080');
        }
  ); //end of listen
