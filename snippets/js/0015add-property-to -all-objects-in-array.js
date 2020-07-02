const myTestArray = [
  {
    name: "jack",
    color: "red",
    values: [2, 7, 3],
    image: { v1: 1, v2: 2, v3: 3 }
  },
  {
    name: "bill",
    color: "red",
    values: [5, 6, 1],
    image: { v1: 1, v2: 2, v3: 3 }
  },
  {
    name: "jane",
    color: "red",
    values: [3, 5, 1],
    image: { v1: 1, v2: 2, v3: 3 }
  }
];

const newProperty = { test1: 1, test2: 2 };

console.log(myTestArray);

myTestArray.forEach(result => result.newprop = newProperty);


console.log('');

console.log(myTestArray);
