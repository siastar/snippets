"use strict";

function sing(song) {
  console.log(song);
};

function say(word){
  console.log(word);

};

function power(number){
  console.log(number*number);
};

function execute(aCertainFunction, value) {
  aCertainFunction(value);
};

/*
execute receives as arguments a function (a CertainFunction) and
a parameter/argument that can be used with that certain function.
aCertainFunction can be any function and "execute" will
do different things according to the function passed
as argument

*/

/*
We define the function we want to pass
to execute right there at the place where
execute expects its first parameter.
This way, we don't even need to give the
function a name, which is why this is called
an anonymous function.
*/

execute(sing, "Applause");
execute(say, "in the end you got it");
execute(power, 4);
console.log("---------");
execute(function(song){ console.log(song) }, "Anon - Applause");
execute(function(word){ console.log(word) }, "Anon - Hello");
execute(function(poem){console.log(poem)}, "Anon - Rhyme of the ancient mariner");
execute(function(number){ console.log(number*number)}, + 4 );
