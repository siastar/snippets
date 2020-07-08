'use strict';

const x = function(){
  console.log('I am a function')
};

x();
console.log(Object.getPrototypeOf(x));

const y = class{};
console.log(Object.getPrototypeOf(y));
