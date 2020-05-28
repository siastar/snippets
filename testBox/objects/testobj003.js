"use strict";

let mytestA = {
		propA1 : 123,
		propA2 : "prop A2",
		methA1 : function () {return "this is method A1";},
		methA2 : function () {return "this is method A2";},
};


let mytestB = {
		propB1 : "prop B1",
		propB2 : "prop B2",
		methB1 : function () {return "this is method B1";},
		methB2 : function () {return "this is method B2";},
};

let mytestC = {
		propC1 : "prop C1",
		propC2 : "prop C2",
		methC1 : function () {return "this is method C1";},
		methC2 : function () {return "this is method C2";},
};




console.log(mytestA);
console.log(mytestA.methA1());

console.log(mytestB);
console.log(mytestB.methB2());

console.log(mytestC);
console.log(mytestC.methC1());



let orgObject = {company: "Pippo SPA"}
console.log(orgObject);
let employee = Object.create(orgObject,  {    name:{      value: 'EmployeeOne'    }  });
console.log(employee);
console.log(employee.name);
console.log(orgObject);



