"use strict";

const donaldDuck = {
							prop1 : "this is prop 1",
							prop2 : "this is prop 2",    						
    						prop3 : "this is prop 3",    						
    						prop4 : "this is prop 4",    						
    						prop5 : "this is prop 5",    						
    						prop6 : "this is prop 6",    						
    						prop7 : "this is prop 7",    						
    						
    						method1 : function(){return("this is method 1")},
							method2 : function(){return("this is method 2")},	
							method3 : function(){return("this is method 3")},																				
							method4 : function(){}						 
						 
						 
						 
						 
						 };


/*let showDonald = console.log(donaldDuck);
let showprop = console.log(donaldDuck.prop1);
let showfunction = console.log(donaldDuck.method1());*/
						 


let x = Object.create(Object.prototype,
  {
    output1:{value: donaldDuck,},
    output2:{value: donaldDuck.prop1,},
    output3:{value: donaldDuck.prop2,},
    output4:{value: donaldDuck.method1()}
  });


console.log(x.output1)    //Output: Fiesta
console.log(x.output2);					  
console.log(x.output3);					  
console.log(x.output4);				  
												  
												  