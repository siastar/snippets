console.clear();

const myList = [
  {
    id: 0,
    prop1: "test 01",
    prop2: "test 02"
  },
  {
    id: 1,
    prop1: "test 11",
    prop2: "test 12"
  },
  {
    id: 2,
    prop1: "test 21",
    prop2: "test 22"
  },
  {
    id: 3,
    prop1: "test 31",
    prop2: "test 32"
  },
  {
    id: 4,
    prop1: "test 41",
    prop2: "test 42"
  }
];

console.log(myList);

//returns prop1 value in the object withj id: 4
console.log("find");
let test1 = myList.find(x => x.id === 4).prop1;
console.log(test1); // returns 'test41'
console.log("-----------------------------");

//assign 'new value to  prop1 the object withj id: 4
myList.find(x => x.id === 4).prop1 = "new value";
console.log(myList);
console.log("--------------------------");

//returns prop1 value in the object withj id: 4, which now is 'new value'
let test2 = myList.find(x => x.id === 4).prop1;
console.log(test2); //returns 'new value'

//looking for index ???
//returns the array's index of the object whose id is 3
let test3 = myList.findIndex(x => x.id === 3);
console.log("index: ", test3);
console.log("--------------------------");

//use splice to insert element in specific index
//this test will replace the element in index 2 with new object
const start_index = 2;
const /*numbers of*/ elements_to_remove = 1;
const element_to_insert = { id: 999, prop1: "test xx", prop2: "test yy" };

myList.splice(start_index, elements_to_remove, element_to_insert);
console.log(myList);

console.log("-------------------------");

console.log("mapping... ");
let test4 = myList.map(x => ({test_id: x.id, testP1: x.prop1, testP3:x.prop2}));
console.log('test4' , test4);


console.log("-------------------------");

const arr = [{
  id: 1,
  name: 'bill'
}, {
  id: 2,
  name: 'ted'
}]

const result = arr.map(person => ({ test_value: person.id, test_text: person.name }));
console.log(result)
