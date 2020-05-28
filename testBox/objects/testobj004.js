"use strict";

var objArr = [
				 {
		       propA1 : "prop A1",
		       propA2 : "prop A2",
		       propA3 : function () {return "this is method A1";},
		       propA4 : function () {return "this is method A1";},
             },
             {
		       propB1 : "prop B1",
		       propB2 : "prop B2",
		       methB1 : function () {return "this is method B1";},
		       methB2 : function () {return "this is method B2";},
             },
             {
		       propC1 : "prop C1",
		       propC2 : "prop C2",
		       methC1 : function () {return "this is method C1";},
		       methC2 : function () {return "this is method C2";},
             },
];


console.log(objArr[0]);
console.log(objArr[1]);
console.log(objArr[2]);



console.log(objArr[0].propA1);
console.log(objArr[1].propB2);
console.log(objArr[2].propC1);
objArr[2].propC1=9999999;
console.log(objArr[2].propC1);


