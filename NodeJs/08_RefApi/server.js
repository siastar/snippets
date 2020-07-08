// server.js

import express from 'express';
//we imported express

const app = express()
//set up a new express instance

app.use(express.json())
/*set up a new express.json() middleware -
this is needed to get access to request body*/

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})

app.listen(3000)
console.log('app running on port ', 3000);
