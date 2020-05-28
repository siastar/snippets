window.onload = function() {
															var audio = new (window.AudioContext || window.webkitAudioContext)();
     														position = 0,
        													scale = {g: 392, f: 349.23, e: 329.63, b: 493.88},
     														song = "gfeb-bfeg-";
        													setInterval(play, 1000 / 2);

        													function createOscillator(freq) {
        																													var osc = audio.createOscillator();

        																													osc.frequency.value = freq;
        																													osc.type = "sawtooth";
        																													osc.connect(audio.destination);
        																													osc.start(0);

        																	 												setTimeout(function() {
            																																								osc.stop(0);
            																																								osc.disconnect(audio.destination);
        																																								 }, 1000 / 2)
    																														}

        												 function play() {
        																					var note = song.charAt(position),
            																				freq = scale[note];
       																				   position += 1;
        																					if(position >= song.length) {position = 0;}
        																					if(freq) {createOscillator(freq);}
    																					}
																};