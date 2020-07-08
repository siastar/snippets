const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cors = require ('cors');


const PORT = 4321;

// // dotenv is a method which allows to hide db connection parameters such as username and password by storing the
// // information in a ".env" file located in the app root folder,instead to write them in plain text

// // DB name: myapiapp / collection name: myapiappdb / user: "myuser" /  pwd: "mypassword" / roles: ["readWrite"]
// // mongod listening on port: 27017

// // app.js hardcoded routes
const homeRoute = '/';
const testRoute = '/testpage';//doubletesting purposes

// // import routes from external modules:
const PostsRoute = require('./routes/PostsRoute.js');//testing purposes
const CatsRoute = require ('./routes/CatsRoute.js');//doubletesting purposes 
const MessagesRoute = require ('./routes/MessagesRoute.js');//tripletesting purposes

const DatabaseRoute = require ('./routes/DataBaseRoute.js');//effective gears
// DataBaseRoute contains the software to manipulate the DB, upload, search, modify and delete stuff

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////  MIDDLEWARES - ROUTES DEFINED IN OTHER MODULES            ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //Middlewares
// // middlewares allow server to manipulate data retrieved from db according to the chosen route


app.use(bodyParser.json());
// converts req.body to json data

app.use(cors());
// needed in case of cross-domine requests. ref https://www.npmjs.com/package/cors
// Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be
// requested from another domain outside the domain from which the first resource was served.[1]
// A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos.


app.use('/database' , DatabaseRoute);
// //when "localhost:PORT/database" is reached "DatabaseRoute" is invoked from the path ./routes/DataBaseRoute.js

app.use('/postspage', PostsRoute);
// //when "localhost:PORT/postspage" is reached "PostsRoute" is invoked from the path ./routes/PostsRoute.js
// //in PostRoute there could be countless subroutes /posts/myfirstpost posts/mysecondpost .... posts/whateverpost

app.use('/messages' , MessagesRoute);
// //when "localhost:PORT/messages" is reached "MessageRoute" is invoked from the path ./routes/MessagesRoute.js
// //in MessagesRoute there could be countless subroutes /message/myfirstmessage message/mysecondmessage .... messahes/mywhatevermessage

app.use('/catspage' , CatsRoute);
// //when "localhost:PORT/catpages" is reached "CatsRoute" is invoked from the path ./routes/CatsRoute.js.
// //in CatsRoute there could be countless subroutes /catpages/tom /catpages/sylvester .... catpages/whoevercat 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////  NEXT  ROUTES ARE HARDCODED IN THE app.js, NOT A GREAT IDEA BUT ANYWAY...  //////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // this route is hardcoded in the app.js file
app.get(homeRoute , (req, res) => {
    res.send('this is the Home Page (this message is hardcoded in app.js middleware)'); // responds to the request by sending the outcoming output on "homeRoute" (localhost:PORT/)    
});

// // this route is hardcoded in the app.js file
app.get(testRoute , (req, res) => {
    res.send('this is a test page (this message is hardcoded in app.js middleware)');// responds to the request by sending the outcoming output on "testRoute" (localhost:3000/testpage)
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////                   MONGO DB CONNECTION             ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //Mongoose documentation https:mongoosejs.com/docs/connections.html

require('dotenv/config'); //https://www.npmjs.com/package/dotenv
// // route to DataBase (access credentials hidden via dotenv)
const dbPath = process.env.DB_CONNECTION_CREDENTIALS;

//const dbPath = 'mongodb+srv://Jack:JackPa55word@raatestcluster-fcvtr.mongodb.net/admin?retryWrites=true&w=majority';
//const dbPath = 'mongodb://localhost:27017/myuser:mypassword@myapiapp';
//const dbPath ='mongodb://localhost:27017/myapiapp';

// mongoose.connect(dbPath , 
//                  {useNewUrlParser: true}, () => 
//                  {console.log('connected to DB on route:', dbPath);}
//                 );


mongoose.connect(dbPath, {
    
    useUnifiedTopology: true, // https://github.com/Automattic/mongoose/issues/8156
    useNewUrlParser: true,
})
    .then(() => console.log('DB Connected on the path: ', dbPath))
    .catch(err => {
        console.log('DB Connection Error:' , err);
});

//mongoose.connect(dbPath, {useNewUrlParser: true});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////                        LISTEN PORT                ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Define a port where to listen for requests
app.listen(PORT);





