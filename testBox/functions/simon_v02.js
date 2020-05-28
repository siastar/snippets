// Define General Variables  ******************************************************* 
var theSacredSequence = []; //this is the full sequence to repeat, it changes only at new game;
var thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game it starts of 4 notes then adds one by one
var thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game
var clickCounter = 0;// step-click counter
var stepCounter = 0; // step-click counter
var Limit = 1; // number of notes to play
var Goal = 10; // limit to next level
var Played = "note"; // this is the active user played note, it varies continuosly
var runningFunction = "--"; // check in webpage for running function

// BEGIN THE SACRED SEQUENCE generate a random sequence of (seqLen) symbols ABCD ******************************************************* 

function generateSacredSequence() {
											runningFunction="generateSacredSequence"; // returns running function in webpage
											var seqLen = Goal;											
											console.clear();
											theSacredSequence = [];
											 
												for (i=1; i<=Goal; i++) {// lenght of the sacred sequence (it varies with level progress)
												let theNote = "."
												let myRnd = Math.floor(Math.random() * 100) + 1; //generate a number between 1 and 100
												if      (1 <= myRnd && myRnd <= 25)		{theNote = "A";} //evaluate the number and assign it a value ABCD
												else if (26 <= myRnd && myRnd <= 50)	{theNote = "B";} //evaluate the number and assign it a value ABCD
												else if (51 <= myRnd && myRnd <=75)		{theNote = "C";} //evaluate the number and assign it a value ABCD
												else if (76<= myRnd && myRnd <= 100)	{theNote = "D";} //evaluate the number and assign it a value ABCD
												else {console.log("something goes wrong when myRnd is " + myRnd);} //say you to fuck offand check the myRnd value
												console.log( "myRnd " + myRnd + " Note " + theNote + " index value " + i); //check
												theSacredSequence.push(theNote); //put theNote into theSacredSequence	
												console.log("the Sacred Sequence is " + theSacredSequence); //check
												}
											document.getElementById("displaySequence").innerHTML = theSacredSequence; //	display theSacredSequence 
											//displayVar();											
											//tryToFollowMe();
}
// END THE SACRED SEQUENCE------------------------------------------------------------------------------------------------------------------------------- 


// BEGIN TRY TO FOLLOW ME---displays the partial sequence to play based on theSacredSequence ----------------------------------------------------------------------
function tryToFollowMe(){
								runningFunction="tryToFollowMe";		//running function check						
								console.log("here start tryToFollowMe"); //running function check in console								
								thePartialSequence=[];								
								thePartialSequence = theSacredSequence.slice(0, Limit); //define partial sequence to play, from sacredSequence							
								console.log("now you need to play " +  Limit + " correct notes");
								console.log("repeat this notes " + thePartialSequence); //check console		
								displayVar();														
}

// END TRY TO FOLLOW ME ************************************************************

// BEGIN play your note by pressing buttons in HTML it generates the corrispondent letter ***************************************************************************************************

function PlayX(button) {
  					runningFunction="PlayX"; 					
 					var x = button.id // take the id value from the button you play (all the buttons point to this function) for themoment it has no use (is a fossil)
 					var Played = button.value; // CLICK take the value which represent the played note from the relative button in html
					console.log(Played); 					
 					thePlayerSequence.push(Played);//push the button value into the user array thePlayerSequence 	            
					console.log(thePlayerSequence);		               
					clickCounter ++
					displayVar();
					
					checkIfCorrect(); //call the function which check il the entry is correct						
					
					}
					
// END play your note by pressing buttons in HTML it generates the corrispondent letter ***************************************************************************************************
					
// BEGIN check if correct ..................................................................................

function checkIfCorrect(){ var index = stepCounter;							
									stepCounter ++;
									console.log("index " + index);
									console.log("limit " + Limit);
									console.log("stepcounter " + stepCounter);
									console.log(thePlayerSequence);
									console.log(thePartialSequence);
									console.log(thePlayerSequence[index]);
									console.log(thePartialSequence[index]);    							
									if (thePlayerSequence[index] == thePartialSequence[index] && stepCounter == Limit) {addAnother();}	
																																					
									else if (thePlayerSequence[index] == thePartialSequence[index]){console.log("good job");
																												 		 																												  																								  
																												      }													
									else {console.log("bad job");
											resetAll();
											location.reload(); }
}

// END check if correct ---------------------------------------------------------------------------

//BEGIN add another step----------------------------
function addAnother() {console.log("things getting harder")
							  stepCounter = 0; Limit ++;
							  thePlayerSequence = [];
							  displayVar();
							  tryToFollowMe();}  
							  
//END addanother step

/*BEGIN NEXTLEVEL..........................................................................
function nextLevel(){theSacredSequence = []; //this is the full sequence to repeat, it changes only at new game;
							thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game
							thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game
							Counter = 0;// step-click counter 
							Played = "note"; // this is the active user played note, it varies continuosly
							runningFunction = "--";
							Goal = Goal + 4;							
							console.log("this is the next level you will play " + Goal + " notes");
							generateSacredSequence();							
}
// END NEXTLEVEL...............................................................*/

//BEGIN resetAll......reset all game vars and start a new game from 0 .....................

function resetAll(){

theSacredSequence = []; //this is the full sequence to repeat, it changes only at new game;
thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game it starts of 4 notes then adds one by one
thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game
clickCounter = 0;// step-click counter
stepCounter = 0; // step-click counter
Limit = 1; // number of notes to play
Goal = 10; // limit to next level
Played = "note"; // this is the active user played note, it varies continuosly

runningFunction = "--"; // check in webpage for running function

}

//END resetAll......................................::::.............



// BEGIN DISPLAY VAR this function just monitores variables in html, it works like a mass console.log 
function displayVar(){ document.getElementById("clickCounter").innerHTML = clickCounter;
							  document.getElementById("thePartialSequence").innerHTML = thePartialSequence;
							  document.getElementById("Goal").innerHTML = Goal;
							  document.getElementById("thePlayerSequence").innerHTML = thePlayerSequence;
							  document.getElementById("Limit").innerHTML = Limit;
							  document.getElementById("runningFunction").innerHTML = runningFunction;
							  document.getElementById("stepCounter").innerHTML = stepCounter;
							}



// END DISPLAY VAR ))g3n14l(()



// function theCounter() {console.log("theCounter")}

// BEGIN CHECK IF NEXT LEVEL-------------------------------------------------------
//function checkLevel(){console.log(stepCounter);
//							if (stepCounter = Goal){Goal = Goal + 4;
//													  console.log("Next Level is " + Goal);
//													  nextLevel();}
//							}
// END CHECK IF NEXT LEVEL-------------------------------------------------------
