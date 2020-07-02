// const test = {
//   x: 42,
//   getX: function() {
//     return this.x;
//   }
// }

// const unboundGetX = test.getX;
// console.log(unboundGetX()); // The function gets invoked at the global scope
// // expected output: undefined

// const boundGetX = unboundGetX.bind(test);
// console.log(boundGetX());
// // expected output: 42

// this.testQuery = {
//   testUrl: "http://localhost:5000/search",
//   query: "xxx",
//   page: 1,
//   per_page: 18,
//   type: "videos"
// };

// export default class TestBind {
//   constructor(args) {
//     this.catName = "Tom";
//     this.dogName = "Lessie";
//     console.log("constructor this:", this);
//     //**this.testController()
//     this.catName();
//   }

//   catName() {
//     console.log("catName this:", this);
//     console.log("catName this.catName:", this.catName);
//     let newName = "Sylvester";
//     this.catName = newName;
//     console.log("catName this after mewName:", this);
//     console.log("catName this.catName after newName:", this.catName);
//   }
// }

export default class Example {
  static test() {
    console.log('hello world');
  }
}
