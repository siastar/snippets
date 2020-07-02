class Rectangle {

  constructor(height, width) {
    this.height = height;
    this.width = width;
  };
  // Getter
  get area() {
    return this.calcArea()

  };

    get greet(){
	return this.sayHi()
    };

    get both(){
	this.calcArea(),
	this.sayHi()
    };  
    
  // Method
  calcArea() {
    return this.height * this.width;
  };
    
  sayHi() {
    console.log('hello!')
  };


};

const square = new Rectangle(10, 10);


console.log(square.area); // 100
console.log('...');
console.log(square.greet);
console.log('...');
console.log(square.both);
