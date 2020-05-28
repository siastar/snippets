"use strict";

( function(){
    console.log( 'Reached!' );

    function Game(args){	
	     this.init = function(){
	                      this.settings = {
		                        args: args
										                      
	                      };
	                      this.launch();
	                 };

	     this.getSettings = function(){
	                             return this.settings;
	                        };

	     this.launch = function(){
	                       console.log( '\nThis settings:\n', this.getSettings() );
	                  };

	     this.init();
    }

    const newGame = new Game('Ciao!');
}
)();
