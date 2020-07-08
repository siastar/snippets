const http = require("http");

http.createServer((request , response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("is there life on Mars?");
  response.end();
  /*writeHead, write, end are methods of http module
  https://nodejs.org/api/http.html*/
}).listen(8000);
/*
createServer()returns an object on which we need to call
thelisten()function with a port number as theparameter,
in order to bind our application to that port. This makes
the operating system and inturn Node.js forward packets
arriving at that port to our application.

is like console.log
console is an object on which is applied its own
method ".log";
*/
