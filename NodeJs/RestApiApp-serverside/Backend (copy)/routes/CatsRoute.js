const express = require ('express');
const router = express.Router();

router.get('/' , (req, res) => {
    res.send('this is the cats page!');
    // responds to the request by sending the outcoming output on "/posts" (localhost:3000/catpages)
});

router.get('/tom' , (req, res) => {
    res.send('this is the ˝Tom the cat˝ page!');
    // responds to the request by sending the outcoming output on "/posts" (localhost:3000/catpages)
});

router.get('/sylvester' , (req, res) => {
    res.send('this is the ˝Sylvester the cat˝  page!');
    // responds to the request by sending the outcoming output on "/posts" (localhost:3000/catpages)
});

router.get('/felix' , (req, res) => {
    res.send('this is the ˝Felix the cat˝  page!');
    // responds to the request by sending the outcoming output on "/posts" (localhost:3000/posts)
});

module.exports = router;
