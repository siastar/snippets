"use strict";

const donaldDuck = {
  say : (text, transform) => {
        /*defines an arrow function which is going to expected
        arguments "text" and "transform"*/
          let donaldIntro = "Hi I'm a duck and I say: " + text;
          /*defines a variable by processing "text" arg*/
          if (typeof(transform) === "function") {
          /*checks if "trasform" is an actual processable function
          and if it is...*/
          donaldIntro = transform(donaldIntro);
          /* changes "donaldIntro" using "donaldIntro" itself as an
          argument for the anonimous function received as argument in turn.
          (what's that face? you wrote it)*/
          }
          console.log(donaldIntro);
  }
};

donaldDuck.say(" Hello Quack, Duckers!!!" , text => text.toUpperCase());

/*                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^
                                            this is the anonimous function
                                            passed as argument, this function
                                            can be anything*/

//donaldDuck.say(" and this text is more long than ", text => text.length);
