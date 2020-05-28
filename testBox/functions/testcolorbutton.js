
var duration = 1/3; // set the duration of the note
var interval = 1/2; // set the interval between the notes
var FreqA = 250; // GREEN frequencies of the original Simon Game
var FreqB = 300; // RED frequencies of the original Simon Game
var FreqC = 350; // YELLOW frequencies of the original Simon Game
var FreqD = 400; // BLUE frequencies of the original Simon Game
var FreqX = 0;



// BEGIN TRY TO FOLLOW ME---displays the partial sequence to play based on theMainSequence and wait for user to repeat it-
// it does not call any function, it just ends up, the next event is triggered by playing button--                                                                                                                

function tryToFollowMe(){																					
								 var thePartialFreq = [250,350,300,400,350,250,300,400];	
								 console.clear();    																		    					
  								 for (i = 0; i < thePartialFreq.length; i++) {generateSimonSound(thePartialFreq[i], i * interval);
  								 
  																							changeButtonColor(thePartialFreq[i], i * interval);}
  								 
  								                                             //resetButtonColor(i * interval);
  								 }
  											     																							

// END TRY TO FOLLOW ME **               

//BEGIN generateSound - it generates the sound as requested by tryToFolloeMe() and PlayX()    
                                                                                                
function generateSimonSound(frequency, time) { 				// generates the sound for Simon | is called by tryToFollowMe															

																																																
																								var context = new AudioContext(); // define the audio context to execute the song
  			  																					var o = context.createOscillator(); // creates an oscillator to produce the sound
    																							var g = context.createGain(); // what the fuck


    																		    																		  																												
    																							o.connect(g); // connects the oscillator to what the fuck
    																							g.connect(context.destination); 
    																							g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time ); //this seems a kind of hack
    																							o.frequency.value = frequency;
    																							o.type = "square";
																							  // console.log("Simon freq " + frequency + " Simon Time " + time);
    																							o.start(time);    		
    														}
    																							
    																																																						
//END generateSound - it generates the sound as requested by listenToMySong() and PlayX()                                                                                                                             

//BEGIN changeButtonColor                                                                                                                                                                                                            

function changeButtonColor(frequency, time) {
	
										setTimeout(function(){
										     							   if (frequency == FreqA) {console.log("GREEN BUTTON"); document.getElementById("playA").style.background='black'; resetButtonColor(); 	}												  						
 																    else if (frequency == FreqB) {console.log("RED BUTTON"); document.getElementById("playB").style.background='black'; resetButtonColor(); 	}
 										                      else if (frequency == FreqC) {console.log("YELLOW BUTTON"); document.getElementById("playC").style.background='black';resetButtonColor(); 	}
 									                         else if (frequency == FreqD) {console.log("BLUE BUTTON"); document.getElementById("playD").style.background='black';resetButtonColor(); 	}
 									                         else{console.log("Buttons color stuff");}
 									                        },i * 500)
																					  
								   					  }

																						
																							

//END changeButtonColor                                                                                                                                                                                                            

//BEGIN resetButtonColoR                                                                                                                                                                                                                                

function resetButtonColor(){
	 									setTimeout(function(){
																	document.getElementById("playA").style.background="green";
																	document.getElementById("playB").style.background="red";														
																	document.getElementById("playC").style.background="yellow";
																	document.getElementById("playD").style.background="blue";
																	},1000/3)
									}

//END resetButtonColoR                                                                                                                                                                                                                                
