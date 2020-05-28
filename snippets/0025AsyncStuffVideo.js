const fetch = require("node-fetch");

const posts = [
  { title: "post One", body: "this is my first post" },
  { title: "post Two", body: "this is my second post" },
  { title: "post Three", body: "this is my third post" }
];

function getPosts() {
  setTimeout(() => {
    let output;
    posts.forEach((post, index) => {
      //***console.log('**' , post,index)
      output += console.log(`post title: ${post.title}`);
    });
    //***console.log(output);
  }, 1000);
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);

      const error = false;
      if (!error) {
        resolve();
      } else {
        reject("Error...");
      }
    }, 2000);
  });
}

async function start() {
  await createPost({ title: "post Four", body: "this is my fourth post" });
  getPosts();
}

async function fetchData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const validData = await response.json();
  console.log(validData);
}

start();
fetchData();
// createPost({ title: "post Four", body: "this is my fourth post" })
//     .then(getPosts) //*** execute resolve() if no error
//     .catch( err => console.log(err)) //*** execute reject() if error

//console.log('1')
//console.log('2')

// const promise1 = Promise.resolve("hallo folks");
// const promise2 = 3.1428;
// const promise3 = new Promise((resolve, reject) =>
//   setTimeout(resolve, 2000, "goodbye folks")
// );

// const promise4 = fetch('https://jsonplaceholder.typicode.com/posts').then( res => res.json());
// //*** res is the fetch return that needs to be turned in json format

// Promise.all([promise1, promise2, promise3, promise4]).then(allPromises =>
//   console.log(allPromises)
// );
