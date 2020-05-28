function testDelay(){console.clear;																				
							console.log("testing delay");									 
  								

for (i = 1; i <= 10; ++i) {
  									setDelay(i);
								 }

}

function setDelay(i) {
  								setTimeout(function(){
    							console.log("seconds passing... " + i);
  							}, 1000 * i);
}
							
							
/*  								for (i = 1; i < 10; i++) {  																  
																  theAnswer();  																  
  																  //setTimeout(theAnswer, 2000*i); 
  						   									 }
  							}				     	
  											     	
function theAnswer(){console.log("fine, thank you");}									

*/
