var context = new AudioContext();
var notes = [300, 350, 400, 450, 500];
var duration = 1/3;
var interval = 1/2;

function play(frequency, time) {
    															var o = context.createOscillator();
    															var g = context.createGain();
    															o.connect(g);
    															g.connect(context.destination);
    															g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time
    																																		  );
    															o.frequency.value = frequency;
    															o.start(time);
 															  }

  															  for (var i = 0; i < notes.length; i++) {
    																																	 play(notes[i], i * interval);
  																																		}