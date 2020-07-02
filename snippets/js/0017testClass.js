class User {
  constructor(userData) {
    this.userData = userData;
  }

  name() {
    console.log("firstname: ", this.userData.firstname);
  }
  surname() {
    console.log("secondname: ", this.userData.secondname);
  }
  address() {
    console.log("address: ", this.userData.address);
  }
  city() {
    console.log("city: ", this.userData.city);
  }
}

let userData = {
  firstname: "Edward",
  secondname: "Head",
  address: "00666 22, Acacia Avenue",
  city: "London"
};

//let xyz = 'john'

let user = new User(userData);

let user2 = new User({
  firstname: "Jack",
  secondname: "Frack",
  address: "99999 666, Elm Street",
  city: "Glasgow"
});

user.name();
user.surname();
user.address();
user.city();
console.log("---------------------------------------------");
user2.name();
user2.surname();
user2.address();
user2.city();
console.log("---------------------------------------------");
console.log("type of User: ", typeof User);
console.log("type of user: ", typeof user);
console.log("---------------------------------------------");
console.log(User === User.prototype.constructor);
console.log(Object.getOwnPropertyNames(User.prototype));
console.log(User);
console.log("---------------------------------------------");

class Car {
  constructor(model) {
    this.model = model;
  }

  get model() {
    return this._name;
  }

  set model(model) {
    switch (true) {
      case model == "ford":
        console.log("USA Car");
        break;
      case model == "opel":
        console.log("German Car");
        break;
      default:
        console.log("model not valid");
    }

    return (this._model = model);
  }
}

let car = new Car("opel");
console.log(car._model);

console.log("");
console.log("-------------  getters and objects ----------");
console.log("");

let cat = {
  name: "Sylvester",
  hairs: "long",
  color: "black and white",
  age: 9,

  get _name() {
    let prefix = "let me introduce you ";
    return prefix + this.name;
  },

  get _hairs() {
    let prefix = "he got ";
    let suffix = " hairs";
    return prefix + this.hairs + suffix;
  },

  get _color() {
    let answer = "and he is a " + this.color + " cat";
    return answer;
  },

  get _age() {
    return `${this.name} has ${this.age} years`;
  }
};

console.log(cat);

console.log("");

console.log(cat.name);

console.log(cat.hairs);

console.log(cat.color);

console.log("");

console.log(cat._name);

console.log(cat._hairs);

console.log(cat._color);

console.log(cat._age);

console.log("");
console.log("-------------  getters  and classes ----------");
console.log("");

let plane = {
  brand: "Boeing",
  model: "747",
  range: "5400"
};

class airPlane {
  constructor(plane) {
    this.airPlane = plane;
  }

  get _brand() {
    return "got " + this.airPlane.brand;
  }

  get _model() {
    return "got " + this.airPlane.model;
  }

  get _range() {
    return "got " + this.airPlane.range;
  }

  check() {
    console.log(this.airPlane);
  }
}

const testPlane = new airPlane(plane);
console.log(testPlane._brand);

testPlane.check();

console.log("");
console.log("-------------  setters and objects ----------");
console.log("");

let dog = {
  name: "Hector",
  breed: "corgy",
  color: "white",

  set setName(dogname) {
    this.name = dogname;
  }
};

console.log(dog);

dog.setName = "Johnny";

console.log(dog);

console.log("");
console.log("-------------  setters and classes ----------");
console.log("");

let duck = {
  name: "Duffy",
  color: "black",
  age: "5"
};

class Duck {
  constructor(duck) {
    this.duck = duck;
  }

  get duckName() {
    return "duck name is " + this.duck.name;
  }

  set duckColor(color) {
    if (color !== "black") {
      console.log("...Duffy should be black");
    }
    this.duck.color = color;
  }
}

const testDuck = new Duck(duck);

console.log(testDuck);
console.log(testDuck.duckName);

testDuck.duckColor = "black";
console.log(testDuck);

console.log("");
console.log("-------------  extend  classes ----------");
console.log("");

let info = {
  name: "Jack",
  speed: 0
};

console.log(info);

class Animal {
  constructor(info) {
    this.info = info;
  }

  run(speed) {
    this.info.speed = speed;
    console.log(`${this.info.name} runs at ${this.info.speed} km/h`);
  }

    stop() {
	console.log('***' , this.info.speed);
    switch (true) {
    case this.info.speed > 0:
        this.info.speed = 0;
        console.log(`${this.info.name} has stopped`);
        break;
      case this.info.speed == 0:
        console.log(`${this.info.name} was already still`);
        break;
      default:
        console.log("default");
        break;
    }
  }
}

const testAnimal = new Animal(info);

testAnimal.run(0);

testAnimal.stop();

//class Rabbit extends Animal {}
