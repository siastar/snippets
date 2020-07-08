"use strict";

console.log("testing stuff and getting confident");

//define a generic object called donaldDuck
const donaldDuck = {

  //donaldDuck properties are
  uncle : "scrooge",
  partner : "daisy",
  cousin : "fethry duck",

  //donaldDuck methods are
  power : function(power){
            console.log("power of " + power + " is " + power*power);
  },

  root :  function(root){
            console.log("root of " + root + " is " + Math.sqrt(root));

  },

  writeStuff : function(text){
            console.log("and so... " + text);
  },

}

console.log(donaldDuck.uncle);
console.log(donaldDuck.partner);
console.log(donaldDuck.cousin);
donaldDuck.power(9);
donaldDuck.root(2);
donaldDuck.writeStuff("what did you just discover you silly man?");
