/*let i=1
while (i<100){
let mysequence = [1];
mysequence.push(i);
console.log(mysequence);
i++
}

let i=0
let sequence = [i];
while (i<=10) {
sequence.push(i+1);
console.log(sequence);
i++;
}


let j=10
while(j>=0){
sequence.pop();
console.log(sequence);
j--;

}

//console.log(sequence.pop());
//console.log(sequence);


let day1 = {
squirrel: false, 
events: ["case 1", "case 2", "case 3", "case 4", "case 5", "case 6"]
};

console.log (day1.squirrel);





let testObj = {
  prop1: "val 1", 
  prop2: "val 2", 
  prop3: "val 3", 
  prop4: "val 4", 
  prop5: "val 5",
 
};

console.log(testObj.prop3); //return value of a specific property in the object
console.log("prop1" in testObj); //chock for a property presence in the object
console.log(Object.keys(testObj)); //return the list of properties of the called object

Object.assign(testObj, {prop6: 3, prop7: 4}); //add properties to the called object
console.log(Object.keys(testObj)); //return the list of properties of the called object

delete testObj.prop2;
console.log(Object.keys(testObj)); //return the list of properties of the called object


*/


let journal = [];

function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}



