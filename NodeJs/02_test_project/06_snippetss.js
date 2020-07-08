"use strict";

const donaldDuck = {
        say : function(text, changeCase) {
                let donaldText = "I am a talking duck and I say: " + text;
                if (typeof(changeCase) === "function") {
                  // if the argument called "changeCase" is an actual
                  //function (typeof)
                  donaldText = changeCase(donaldText);
                  //then use the function with the desired argument
                }
                console.log(donaldText);
                //if not, then proceed with the rest of the code
        },
};

function changeCase(text) {
  return text.toUpperCase();
};

donaldDuck.say("Hello, Quack", changeCase.donaldText;
donaldDuck.say("Hello, Quack");
