// Define General Variables  ******************************************************* 
var theSacredSequence = []; //this is the full sequence to repeat, it changes only at new game;
var thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game
var thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game
var Played = "."; // this is the active user played note, it varies continuosly
var counter = 0;// not used now

// BEGIN THE SACRED SEQUENCE generate a random sequence of (seqLen) symbols ABCD ******************************************************* 

function seqGenerator() {
console.clear()
theSacredSequence = []
var seqLen = 12; // lenght of the sacred sequence (it varies with level progress)

for (i=1; i<seqLen; i++) {
let theNote = "."
let myRnd = Math.floor(Math.random() * 100) + 1; //generate a number between 1 and 100
	if      (1 <= myRnd && myRnd <= 25)		{theNote = "A";} //evaluate the number and assign it a value ABCD
	else if (26 <= myRnd && myRnd <= 50)	{theNote = "B";} //evaluate the number and assign it a value ABCD
	else if (51 <= myRnd && myRnd <=75)		{theNote = "C";} //evaluate the number and assign it a value ABCD
	else if (76<= myRnd && myRnd <= 100)	{theNote = "D";} //evaluate the number and assign it a value ABCD
	else {console.log("something goes wrong when myRnd is " + myRnd);} //say you to fuck offand check the myRnd value
	console.log( "myRnd " + myRnd + " Note " + theNote + " index value " + i); //check
	theSacredSequence.push(theNote); //put theNote into theSacredSequence	
	console.log("the partial Sequence is " + theSacredSequence); //check
}

//	display theSacredSequence 

document.getElementById("displaySequence").innerHTML = theSacredSequence;

}
// END THE SACRED SEQUENCE 


// BEGIN play your note by pressing buttons in HTML it generates the corrispondent letter ***************************************************************************************************


function PlayA() { //Button A call this function
  			Played = document.getElementById("playButtonA").value; // take the value from button 
  				 		document.getElementById("youPlayed").innerHTML = Played; // send the played value to html
						thePlayerSequence.push(Played);	// push the played value in player sequence				
						console.log(thePlayerSequence);					
						return Played;
					
}

function PlayB() { //Button B call this function
  			Played = document.getElementById("playButtonB").value;
  				 		document.getElementById("youPlayed").innerHTML = Played;
						thePlayerSequence.push(Played);	            
						console.log(thePlayerSequence);		               
               	return Played;
}

function PlayC() { //Button C call this function
  			Played = document.getElementById("playButtonC").value;
  				 		document.getElementById("youPlayed").innerHTML = Played;
						thePlayerSequence.push(Played);			    		
						console.log(thePlayerSequence);				    		
		    			return Played;
}

function PlayD() { //Button D call this function
  			Played = document.getElementById("playButtonD").value;
  				 		document.getElementById("youPlayed").innerHTML = Played;
						thePlayerSequence.push(Played);			      		
						console.log(thePlayerSequence);			      		
	      			return Played;
}

// END play your note by pressing buttons in HTML it generates the corrispondent letter ***************************************************************************************************

// BEGIN Play the partial sequence ***********************************************************************************

function rockTheParty(){
for(i=4; i<=12; i++){
var thePartialSequence = theSacredSequence.slice(0, i);
console.log(thePartialSequence);
//iWillRockIt();
}
}
// END Play the partial sequence ***********************************************************************************

// Repeat the partial Sequence ***********************************************************************************++
//function iWillRockIt(){

//if (thePartialSequence = thePlayerSequence)

//}
