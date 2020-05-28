'use strict';

let Vehicle = function(){};
Vehicle.prototype.engine = function(){console.log('Vrooooom')};
//defines a blueprint for generic vehicle

let Car = function(){};
Car.prototype = new Vehicle();
//defines a "Car" blueprint starting from generic "vehicle" blueprint
Car.prototype.sound = function(){console.log('honk honk')};
//defines a "sound" specific method for Car

let Bike = function(){};
Bike.prototype = new Vehicle();
//defines a "Bike" blueprint starting from generic "vehicle" blueprint
Bike.prototype.sound = function(){console.log('beep beep')};
//defines a "sound" specific method for Bike

let myCar = new Car(); // creates a new instance of Car
let myBike = new Bike(); // creates a new instance of Bike

myCar.engine(); // executes inherited Vehicle method
myCar.sound(); // executes in-object specific method
myBike.engine(); // executes inherited Vehicle method
myBike.sound(); // executes in-object specific method

/*
in the end
myCar and myBike inherit engine method from Vehicle prototype
but have specific sound methods so that both cars and bikes will have
a Vroooom engine but different sounds (honk honk and beep beep)
*/
console.log('---------');
console.log(Vehicle);
console.log(Car);
console.log(Bike);
console.log('---------');
console.log(myCar);
console.log(myBike);
