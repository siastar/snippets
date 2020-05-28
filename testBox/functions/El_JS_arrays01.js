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


var A = 392.00, B = 329.60, C = 261.60, D = 196.00;

var x = ["a","b","c","d","e"];

var y = (x.join()); 

console.log(y); 
*/




//BEGIN listenTo(ThePartialSequence);-------this solution is a mix of two different examples 
//                                                                                                                                                                                                                        
// https://modernweb.com/audio-synthesis-in-javascript/-                                                                                                                                
//https://stackoverflow.com/questions/46175892/audiocontext-how-to-play-the-notes-in-a-sequence-                                                                

function listenTo(thePartialSequence){	
																			var context = new AudioContext();
																			//var notes = thePartialSequence;
																			var duration = 1/3; //length of the single played note
																			var interval = 1/2; // length of the interval between notes, includes the length of the note itself 
																			var index=0;
    																		var position = 0;
    																		var scale = {A: 392, B: 349.23, C: 329.63, Date: 493.88};
    																		var song = "ABCD-";
																			var note = song.charAt(index):
			



																			function play(frequency, time) {     //this is a subfunction, it generates the actual sound
    																																	    var o = context.createOscillator(); // creates the oscillator
    																																       var g = context.createGain(); // gain (gotta figure out iy))
    																																	    o.connect(g); 
    																																	    g.connect(context.destination);
    																																	    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time); // gotta figure out this
    																																	    o.frequency.value = frequency;
    																																	    o.start(time);
 															 																			   }

  																			  for (index = 0; i < song.length; index++) {play(note[index], i * interval);}
																			}
																			
																			
																			
																			
//                                                                                                                                                                                                                                         																			
																			
																		
function() {

    var audio = new window.webkitAudioContext();
    var osc = audio.createOscillator();
    var position = 0;
    var scale = {A: 392, B: 349.23, C: 329.63, Date: 493.88};
    var song = "ABCD-";

        osc.connect(audio.destination);
        osc.start(0);

    setInterval(play, 1000 / 4);

    function play() {
						var note = song.charAt(position),
            			var freq = scale[note];
            			
            			
        
    }
};										     																
																			
																			
																			
																			
																			
        position += 1;
        if(position >= song.length) {
            position = 0;
        }
        if(freq) {
            osc.frequency.value = freq;
        }