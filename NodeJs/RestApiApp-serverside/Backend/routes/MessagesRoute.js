const express = require ('express');
const router = express.Router();

router.get('/' , (req , res) => {
    res.send('this is the messages landing page!! (this message is hardcoded in MessagesRoute.js)');
    console.log('(you are getting something... [router.get(/) - PostRoute.js])');
//    responds to the request by sending the outcoming output on "/postspage" (localhost:3000/postspage)
});

router.get('/my1stmessage' , (req , res) => {
    res.send('this is my first message !! (this message is hardcoded in MessagesRoute.js)');
    console.log('(you are getting something... [router.get(/my1stmessage) - PostRoute.js])');
    // responds to the request by sending the outcoming output on "/postspage" (localhost:PORT/postspage)
});

router.get('/my2ndmessage' , (req , res) => {
    res.send('this is my second message !! (this message is hardcoded in PostRoute.js)');
    console.log('(you are getting something... [router.get(/my2nfmessage) - PostRoute.js])');
    // responds to the request by sending the outcoming output on "/postspage" (localhost:PORT/postspage)
});

router.get('/my3rdmessage' , (req , res) => {
    res.send('this is my third message !! (this message is hardcoded in MessagesRoute.js)');
    console.log('(you are getting something... [router.get(/my3rdmessage) - PostRoute.js])');
    // responds to the request by sending the outcoming output on "/postspage" (localhost:PORT/postspage)
});

module.exports = router;
