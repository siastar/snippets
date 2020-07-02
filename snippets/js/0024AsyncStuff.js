// function chopVeg(veg) {
//   let result = console.log(`${veg} chopped`);
//   return result;
// }

// function addVeg(veg) {
//   let result = console.log(`${veg} added`);
//   return result;
// }

// async function letBoil(time) {
//   // ***return promise
//   let boilingWater = new Promise(resolve => {
//     setTimeout(() => {
//       resolve(console.log("boiling..."));
//     }, time);
//   });
//   return boilingWater;
// }

// async function boilWater(time) {
//   console.log("pot on fire!");
//   let boilingWater = new Promise(resolve => {
//     setTimeout(() => {
//       resolve(console.log("water is boiling"));
//     }, time);
//   });

//   return boilingWater;
// }

// function stopFire() {
//   console.log("soup ready");
// }

// // ***

// async function makeSoup() {
//   const water = boilWater(2500);
//   chopVeg("onions");
//   chopVeg("carrots");
//   await water;
//   addVeg("carrots");
//   await letBoil(1000);
//   addVeg("onions");
//   await letBoil(1000);
//   stopFire();
// }

// makeSoup();

// function delay(time) {
//   //return delayed result
//   setTimeout(() => {
//     console.log(`delayed ${time} millisec`);
//   }, time);
// }

// let test = new Promise((resolve,reject) => {
//     try{
//         const data = console.log('test');
//         resolve(data)
//     } catch(err){
//         reject(new Error(err))
//     }
// })

//delay(1500);

console.log('start')

setTimeout(()=>{console.log('timeout'),1000})

Promise.resolve('promise resolved').then(res=>console.log(res))

console.log('end')
