'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/',  function(req, res) {
                res.sendFile(__dirname + '/index.html');
              });

io.on('connection', function(socket) {
                      console.log('A new WebSocket connection has been established');
                    });

setInterval(function() {
              let stockprice = Math.floor(Math.random() * 1000);
              io.emit('stock price update', stockprice);
            }, 1500);

http.listen(8000, function() {
                    console.log('Listening on *:8000');
                  });
