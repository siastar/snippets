// let testArr = [
//   { card0: { x: 4, y: 1, z: null } },
//   { card1: { x: 1, y: 2, z: null } },
//   { card2: { x: 5, y: 9, z: null } },
//   { card3: { x: 7, y: 3, z: null } },
//   { card4: { x: 2, y: 6, z: null } }
// ];

// console.log(testArr);

// for (let i = 0; i < 5; i++) {
//   let cardName = "card" + i;
//   let card = testArr[i];
//   let test = card[cardName];
//   console.log("card BEFORE ", card);
//   //console.log(card[cardName]);
//   //console.log('test' , card);

//   test.z = i;
//   console.log("card AFTER", card);
//   // testArr[i].cardName
//   //     cardName.z = i;}
// }

// console.log(testArr);

// console.log(testArr[0]);

//let res = { card0: "a", card1: "b", card3: "c" };

// let testRes = {};

// for (let i = 0; i < 3; i++) {
//   console.log("_", i);
//   console.log("test array", testArr[i]);
//   let key = Object.keys(testArr[i]);
//   console.log("key:", key);
//   let val = Object.values(testArr[i]);
//   console.log("val:", val);
//   testRes[key] = val[0];
//   console.log("testRes...", testRes);
// }

// console.log("testRes:", testRes);

//console.log(testArr)
// switch (true) {
//   case testArr[0] === testRes.card0:
//     console.log(testArr[0].card0);
//     console.log(testRes.card0);
//     console.log("source === target");
//     break;

//   case testArr[0] == testRes.card0:
//     console.log(testArr[0].card0);
//     console.log(testRes.card0);
//     console.log("source == target");
//     break;

//   case testArr[0] != testRes.card0:
//     console.log(testArr[0].card0);
//     console.log(testRes.card0);
//     console.log("source != target");
//     break;

//   default:
//     break;
// }

// const init = {
//   init1: { a: "def1", b: "def2" },
//   init2: { a: "def3", b: "def4" },
//   init3: { a: "def5", b: "def6" },
//   init4: { a: "def7", b: "def8" }
// };

// let next = {};
// let mirror = {};
// next = Object.assign(next, init);
// mirror = Object.assign(mirror, init);

// // let next = init;
// // let mirror = init;

// console.log("init", init);
// console.log("next", next);
// console.log("mirror", mirror);

// next.init1 = { a: "other1", b: "other2" };

// console.log("changed next.init1");

// console.log("init", init);
// console.log("next", next);
// console.log("mirror", mirror);

let data = { a: 1, b: 2, c: 3 };

let test1 = {};
let test2 = {};

Object.assign(test1, data);
Object.assign(test2, data);

console.log(test1)
console.log(test2)
console.log('==:' , test1==test2)
console.log('===:' , test1===test2)
console.log('is:' , Object.is(test1, test2));
