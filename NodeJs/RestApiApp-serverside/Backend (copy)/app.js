const express = require ('express');
const app = express();

const PORT = 4321;

const homeRoute = '/';
const CatsRoute = require ('./routes/CatsRoute.js');//doubletesting purposes 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////  MIDDLEWARES - ROUTES DEFINED IN OTHER MODULES            ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //Middlewares
// // middlewares allow server to manipulate data retrieved from db according to the chosen route

app.use('/catspage' , CatsRoute);
// //when "localhost:PORT/catpages" is reached "CatsRoute" is invoked from the path ./routes/CatsRoute.js.
// //in CatsRoute there could be countless subroutes /catpages/tom /catpages/sylvester .... catpages/whoevercat 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////  NEXT  ROUTES ARE HARDCODED IN THE app.js, NOT A GREAT IDEA BUT ANYWAY...  //////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // this route is hardcoded in the app.js file
app.get(homeRoute , (req, res) => {
    res.send('this is the Home Page (this message is hardcoded in /app.js middleware)');
    // responds to the request by sending the outcoming output on "homeRoute" (localhost:PORT/)    
 });

console.log('listening on', PORT)
app.listen(PORT);





