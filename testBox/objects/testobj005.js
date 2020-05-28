"use strict";

let ducks = { donald : "donald prop",
				  daisy : "daisy prop",
};

let mice = { mickey : "mickey prop",
				 minnie : "minnie prop",
};

let cats = { tom : "tom prop",
				 sylvester : "sylvester prop",
};

let cartoons = [ducks, mice, cats];

console.log(cartoons[0].donald);
console.log(cartoons[0].daisy);
console.log(cartoons[1].mickey);
console.log(cartoons[1].minnie);
console.log(cartoons[2].sylvester);
console.log(cartoons[2].tom);


console.log("£££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££");




var heroes = [
	{
	 name: "Batman", 
	 franchise: "DC"
	 },
	{
   name: "Ironman", 
   franchise: "Marvel"
   },
	{name: "Thor", 
	franchise: "Marvel"
	},
	{name: "Superman", 
	franchise: "DC"}
];

var marvelHeroes =  heroes.filter(function(hero) {
	return hero.franchise == "Marvel";
});

console.log(marvelHeroes);


const folks = [{ person : {nick : "john",
				      		   job : "doctor",},
			  		  hobby  : {indoor : "lego",
					 			   outdoor : "run",},			  			 
			      },
			      
			      { person : {nick : "mary",
				      		   job : "doctor",},
			  		  hobby  : {indoor : "tv",
					 			   outdoor : "walk",},			  			 
			      },
			      { person : {nick : "frank",
				      		   job : "mailman",},
			  		  hobby  : {indoor : "cards",
					 			   outdoor : "run",},			  			 
			      },
			      { person : {nick : "jane",
				      		   job : "teacher",},
			  		  hobby  : {indoor : "cook",
					 			   outdoor : "run",},			  			 
			      },
			      { person : {nick : "charles",
				      		   job : "doctor",},
			  		  hobby  : {indoor : "sleep",
					 			   outdoor : "sleep",},			  			 
			      },
			      		 
]

console.log(folks);


var sportGuys =  folks.filter(function(sport) {
	return (sport.hobby.outdoor == "run" || sport.hobby.outdoor == "walk");
});

console.log(sportGuys);

		let counter = 0;
		while (counter<=10){
		console.log("counter value is " + counter);
		counter++
		} 
		
		
		counter = 8;
		let condition = false;
		while (condition == false){
		console.log("counter value is " + counter);
		counter++;
		if (counter == 20){
		condition = true;
		console.log(condition);		
		}
		
		} 

