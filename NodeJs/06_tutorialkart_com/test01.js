'use strict';
let calculator = require('./calculator.js');

let a=0, b=0;


console.log('1st argument : ' + a);
console.log('2nd argument : ' + b);

console.log('Addition : ' + calculator.add(a,b));
console.log('Subtraction : ' + calculator.subtract(a,b));
console.log('Multiplication : ' + calculator.multiply(a,b));
console.log('Division : ' + calculator.divide(a,b));
