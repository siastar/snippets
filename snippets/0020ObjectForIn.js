   let target = {
        fruit: "banana",
        animal: "cat",
          car: "Ford",
	  city: "Roma"
      };

      let source = {
        fruit: "orange",
          car: "Toyota",
	  aaa: 'aaa',
	  bbb: 'bbb',
	  ccc: 'ccc',
	  ddd: 'ddd',
	  eee: 'eee',
      };

	let counter = 0
	for(const property in source){
	    counter++
	    console.log('test11 / property name: ' , property ,
			' / value: ' , source[property] ,
			' / counter: ' , counter);

	    target[property] = source[property] 
	    console.log('test11 / target',counter , target)


	}
	
