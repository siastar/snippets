const http = require("http");

module.exports.start = () =>{
  http.createServer((request , response) => {
    console.log(`Received request for${request.url}`);
    //https://nodejs.org/api/http.html
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("web reached! \n");
    response.end();
    /*writeHead, write, end are methods of http module
    https://nodejs.org/api/http.html*/
  }).listen(8000);

  console.log("Server has started /,,/");
}
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
