"use strict";

// generic function

function genericFunction ( a , b ){
  console.log(a + " x " +
              b + " = " +
              a*b + " and this was a normal function")
};

genericFunction(3,6); //launch function

//anonimous function

let anonFunction =  function( a , b ){
              console.log(
                a + " x " +
                b + " = " + a*b +
                " and this was an anon function")
  };

anonFunction(4,7); //launch function

//arrow genericFunction

let arrowFunction = (a,b) =>
              console.log(
                a + " x " +
                b + " = " + a*b +
                " and this was an arrow function")


arrowFunction(5,12);
