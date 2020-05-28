"use strict";

const jack = {			
							   													
							prop1 : "this is prop 1",
							prop2 : "this is prop 2",    						
    						prop3 : "this is prop 3",    						
    						prop4 : "this is prop 4",    						
    						prop5 : "this is prop 5",    						
    						prop6 : "this is prop 6",    						
    						prop7 : "this is prop 7",    						
    										     						    						
    						method1 : function(){return "this is method 1" },
							method2 : function(){return "this is method 2" },	
							method3 : function(){return(this)},
																																		
							method4 : function(){
														let x = Object.create(Object.prototype,
  													  {
    													output1:{value: this.prop1},
    													output2:{value: this.prop2},
    													output3:{value: this.method1()},
    													output4:{value: this.method2()},													 													  
  													  });return(x);
  													  },
  													  					 
							method5 : function (){this.prop1 = "modified prop1";
														 this.prop2 = "modified prop2";
														 return(this.method4());						 				
						 				 			   },
						 };

console.log(jack)
console.log(jack.prop1);
console.log(jack.method1());
console.log(jack.method2());
console.log(jack.method3());

console.log("this is the new guy");
jack.prop1 = "we changed it";
console.log(jack.method4());
console.log("this is a modified on the run guy");
console.log(jack.method5());


// console.log(toString(testarray));
