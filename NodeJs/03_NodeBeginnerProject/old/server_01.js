"use strict";

var http = require("http");
/*calls for node module
https://nodejs.org/api/http.html#http_http
The http.createServer() method turns your computer
into an HTTP server.*/

var url = require("url");
//url method, toolset to parse strings

function start(route, handle) {
  function onRequest(request, response) {
  /*defines a function with request and response arguments
  everytime the function will be called a server will be created
  by using http method moudeles*/
    var pathname = url.parse(request.url).pathname;
  //needs url and querystring modules
    console.log("Request for " + pathname + " received.");

    route(handle, pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    /*https://nodejs.org/api/http.html#http_response_writehead
    _statuscode_statusmessage_headers
    Sends a response header to the request. The status code
    is a 3-digit HTTP status code, like 404. The last argument,
    headers, are the response headers. Optionally one can give a
    human-readable statusMessage as the second argument.
    200 is the status of the browser (like 404)
    Returns a reference to the ServerResponse, so that calls
    can be chained.*/
    response.write("*** !!!! Hello World !!!!");
    /*If this method is called and response.writeHead() has not
    been called, it will switch to implicit header mode and flush
    the implicit headers.
    This sends a chunk of the response body. This method may
    be called multiple times to provide successive parts of the body.*/
    response.end();
    /*This method signals to the server that all of the response
    headers and body have been sent; that server should consider
    this message complete. The method, response.end(), MUST
    be called on each response*/
  }

http.createServer(onRequest).listen(8888);
/* createServer is a method of http module which setup a server
listen sets the server to listen on specified port */

console.log("Server has started.");
}

exports.start = start;
/*exporting modules stuff
https://www.sitepoint.com/
understanding-module-exports
-exports-node-js/*/
