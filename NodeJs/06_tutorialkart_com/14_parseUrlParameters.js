'use strict';

// include url module
var url = require('url');
//var address = 'https://www.tutorialkart.com/nodejs/node-js-examples/#Node-Example-HelloWorld'
var address = 'http://localhost:8080/index.php?type=page&action=update&id=5221';
var q = url.parse(address, true);

console.log('host: ' + q.host); //returns 'localhost:8080'
console.log('pathname: ' + q.pathname); //returns '/index.php'
console.log('search: ' + q.search); //returns '?type=page&action=update&id=5221'

var qdata = q.query; // returns an object: { type: page, action: 'update',id='5221' }
console.log('type: ' + qdata.type); //returns 'page'
console.log('action: ' + qdata.action); //returns 'update'
console.log('id: ' + qdata.id); //returns '5221'
