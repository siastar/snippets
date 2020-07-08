'use strict';

let request = require('request');
let async = require('async');
let name, status;
let getUsername = function(callback) {
                    request.get(
                      'http://localhost:8080/getUserName?id=1234',
                      function(err, res, body) {
                        let result = JSON.parse(body);
                        callback(err, result.value);
                      });
                  };

let getUserStatus = function(callback) {
                      request.get(
                        'http://localhost:8080/getUserStatus?id=1234',
                        function (err, res, body) {
                          let result = JSON.parse(body);
                          callback(err, result.value);
                        });
                    };

async.parallel([getUsername, getUserStatus],
                function(err, results) {
                  console.log('The status of user', results[0], 'is', results[1]);
                });
