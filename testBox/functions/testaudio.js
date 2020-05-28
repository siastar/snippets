function play0() {

var song = [200,300,400,200,300,400,200,300,400,,200,300,400 ];
var interval = 1/2;
var duration = 1/3;
	  
	  
	  	console.clear();
	   for (var i = 0; i < song.length; i++) {generateSimonSound(song[i], i * interval);}
	   
	   
	   function generateSimonSound(frequency, time) { 						// generates the sound for the user													
																						var context = new AudioContext(); // define the audio context to execute the song
   		 																				var o = context.createOscillator(); // creates an oscillator to produce the sound
    																					var g = context.createGain(); // what the fuck
    																					 		
    																					 
    																					 		
    																					 																					
    																					o.connect(g); // connects the oscillator to what the fuck
    																					g.connect(context.destination); 
    																					g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time );
    																					o.frequency.value = frequency;
    																					console.log("freq " + frequency);
    																					console.log("time " + time);
    																					o.start(time);    		
    																																	
 																  						}
 																  						
 																  					}