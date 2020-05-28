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

function secretAgent() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("James Bond");
    }, 2000);
  });
}

const agentName = async function() {
  const agent = await secretAgent();
  console.log("agent name is: ", agent);
};

agentName();

const agentNameAgain = async () => {
  const agent = await secretAgent();
  console.log("agent name is ", agent, " again");
};

agentNameAgain();
