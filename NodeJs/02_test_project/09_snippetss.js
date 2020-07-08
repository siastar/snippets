"use strict";

const donaldDuck = {
  say : function(text, transform) {
          let donaldIntro = "Hi I'm a duck and I say: " + text;
          if (typeof(transform) === "function") {
          /*evaluate if "transform" is an actual function, in which case
          executes with "donaldIntro" as argument*/
            donaldIntro = transform(donaldIntro);
          /**/
          }
          console.log(donaldIntro);
  }

};

/*
function upperCaseText(text) {
  return text.toUpperCase();
}
donaldDuck.say("Hello, Quack", upperCaseText);
// the second argument is an actual function and will be executed
donaldDuck.say("Hello, Quack");
// the second argument is missing and will be ignored

donaldDuck.say(" Hello Quack Duckers!!!" , function(text){
                                          return text.toUpperCase()
                                        }
);
// the anonimous function is declared as an argument
//it will executed and discarded on the spot turning itself
//into its own result
*/

donaldDuck.say(" Hello Quack Duckers!!!" , text => text.toUpperCase());
//arrow functions
