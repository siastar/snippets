"use strict";

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
/*local modules paths*/

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
