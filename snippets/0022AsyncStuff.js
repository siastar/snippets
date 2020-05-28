// function greetings(arg) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(console.log("hallo ", arg));
//     }, 100);
//   });
// }

// function curse(arg) {
//   console.log("damn ", arg);
// }

// greetings("Jack");
// curse("Bill");

// *** because greetings() is delayed 2 seconds (by setTimeout), curse() is executed before.

function who(arg) {
  let person = new Promise(resolve => {
    setTimeout(() => {
      resolve(arg);
    }, 1000);
  });
  return person; // *** person is returned after 1000ms
}

function what(arg) {
  let action = new Promise(resolve => {
    setTimeout(() => {
      resolve(arg);
    }, 2000);
  });
  return action; // *** action is returned after 2000ms (+1000 ms previous function)
}

function where(arg) {
  let place = new Promise(resolve => {
    setTimeout(() => {
      resolve(arg);
    }, 3000);
  });
  return place; // *** place is returned after 3000ms(+1000 +2000 previous functions)
}

function goodbye() {
  console.log("see you later");
}

async function asyncMessage() {
  console.log("async");
  const a = await who("you");
  const b = await what(" say hi");
  const c = await where(" from work");

  console.log(a, b, c);
}

asyncMessage().then(goodbye);
// *** the result is delayed 6 seconds because accumulated setTimeOut 1000 + 2000 + 3000 ms)

// *** asyncMessage().then(goodbye()); // *** NO
// *** if you use .then(goodbye()) it will be execute ignoring wait

// *** to avoid accumulation of setTimeOut

async function message() {
  const [a, b, c] = await Promise.all([
    //*** all promises are started in the same moment
    //*** the function will continue when the last promise is fullfilled
    who("John Doe"),
    what(" escaped"),
    where(" Jail")
  ]);
  console.log(a, b, c);
}

message().then(goodbye);

// *** HUNANDLED PROPMISES
// *** async returns ONLY promises so in case of missing promise
async function duckGenerator() {
  return "donald duck";
}

const duck = duckGenerator();
console.log(duck);
// ***returns Promise { donald duck }

const duck2 = duckGenerator().then(fullfilledPromise =>
  console.log(fullfilledPromise)
);

// *** or eventually
duckGenerator().then(fulfilledPromise => console.log(fulfilledPromise));

