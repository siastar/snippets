'use strict';

let Vehicle = {};
Vehicle.drive = function(){
                  console.log('vrooooom !!!!');
};
Vehicle.gears = function(){
                  console.log('manual gears');
};

var car = Object.create(Vehicle);
car.honk = function(){
              console.log('hoooonk');
};

var anotherCar = Object.create(car);
anotherCar.color = function(){
                    console.log('red')
};

car.drive(); //car hinerits drive from vehicle
car.honk();  //car hinerits honk from vehicle
//car.color();
console.log('..................');
anotherCar.drive();
//anotherCar hinerits drive from car which hinerits it from vehicle
anotherCar.color();
//anotherCar has color defined for itself, so it will not available for car
anotherCar.honk();
anotherCar.gears();
