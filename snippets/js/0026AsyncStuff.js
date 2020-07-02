// function test() {
//   let result = new Promise((resolve, reject) => {});
// }

// function delayedValues() {
//   for (let i = 0; i < 10; i++) {
//     let delay = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
//       let delayedTest = new Promise((resolve, reject)=> {
// 	  setTimeout(() => {
// 	      switch(delay){
// 	      case delay < 5000:

// 	      }
// 	  }, delay)
//       })
//       console.log(delay);
//   }
// }

// delayedValues()
// //console.log(delayedValues());

let eventList = [];


function randomEvent(i) {
  //returns random value at random time
  //for (let i = 0; i < 10; i++) {
  return new Promise((resolve, reject) => {
    let delay = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000);
    let value = Math.floor(Math.random() * 1000);
    setTimeout(() => {
      const event = {
        id: i,
        delay: delay,
        value: value
        //greetings: "hallo"
      };
	const badEvent={}
      //console.log("event", event);

      let error = false;
      if (delay > 1500) {
        error = true;
      }
      switch (!error) {
        case true:
          resolve(event);
          break;
        case false:
          reject(event);
          break;
        default:
          console.log("default");
          break;
      }
    }, delay);
  });
  //}
}

async function start() {
  for (let i = 0; i < 10; i++) {
    try {
      const testEvent = await randomEvent(i);
      eventList.push(testEvent);
      console.log("resolved", testEvent);
    } catch (event) {
      // *** e is the argument of reject, if empty report standard erro message
      eventList.push(event);
      event.value = `rejected value ${event.value}`;
      console.log("rejected, elapsed time: ", event.delay);
    }
  }
  console.log(eventList);
}

// function _start() {
//   randomEvent();
// }

start();
console.log("eventList", eventList);
