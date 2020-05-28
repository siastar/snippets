'use strict';

let Car = function(){};
//define a constructor function

Car.prototype.honk =  function () {
                        console.log('honk! hoooonk!')
};

// define a prototype method
Car.prototype.engine = function () {
                         console.log('Vroooom! Vrooooooom!!!')
};
// define a prototype method

let myCar01 = new Car();
let myCar02 = new Car();
//define actual objects from blueprint (prototype)

myCar02.honk = function(){
                  console.log('beeep! beeeeeeep!!')
};
//add a specific method in an aobject already created

myCar01.honk();
//if the method is not present in the actual object it will executed
//the method in the prototype (if it exists)
myCar01.engine();

myCar02.honk();
// if the method is present in the actual object it will be executed
// and the method in the prototype will be ignored
myCar02.engine();

// both cars have the same engine (it comes from the prototype) but
//myCar2 has a special honk which beeps.
