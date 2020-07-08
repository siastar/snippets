"use strict";

const donaldDuck = {
  gender : "male",
  wave : function (hey){console.log("quack !!! " + hey)},
};

console.log(donaldDuck);
console.log(donaldDuck.gender);
console.log(donaldDuck.wave);
console.log(donaldDuck.wave("Donald Duckers"));

donaldDuck.wave("Donald Duckers".toUpperCase());
