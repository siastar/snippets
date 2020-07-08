const express = require ('express');
const router = express.Router();
const myData = require ('../models/PostModel.js'); 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////                     GET BACK FULL DATABASE                   /////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/' , async(req , res) => {
    try {
        const listData = await myData.find(); //.find mongoose method, without options will returns all the db items
        res.json(listData);
    } catch (err){
        res.json({message: err});
    }    
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////             GET BACK SPECIFIC ITEM FROM DATABASE               ///////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/:postId' , async(req , res) => {
    try {
        const findData = await myData.findById(req.params.postId ); //.findById mongoose method, returns a db item by looking its id
        res.json(findData);
        console.log('req.params:', req.params);
        //console.log('req', req);
        
        //params is whatever in the url  after localhost:[PORT]/postspage/[params]
        //eg localhost:3000/postspage/whatever/stuff, params = whatever/stuff
    } catch (err){
        res.json({message: err});
    }    
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////             GET BACK SPECIFIC ITEM FROM DATABASE               ///////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.get('/:postId' , async(req , res) => {
//     try {
//         const showSpecificPost = await myData.findById(req.params.postId ); //.findById mongoose method, returns a db item by looking its id
//         res.json(showSpecificPost);
//         console.log('req.params:', req.params);
//         //console.log('req', req);
        
//         //params is whatever in the url  after localhost:[PORT]/postspage/[params]
//         //eg localhost:3000/postspage/whatever/stuff, params = whatever/stuff
//     } catch (err){
//         res.json({message: err});
//     }    
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////             UPDATE SPECIFIC ITEM FROM DATABASE                 ///////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.patch('/:postId' , async(req, res) => {
    try{
        const updateData = await myData.updateOne(
            //.updateOne is a mongoose method, returns a db item by looking its id
            { _id:req.params.postId },
            { $set : {title: req.body.title} } 
        );
        console.log('updated post: ' , updateData);
        res.json(updateData);
    } catch (err) {
        res.json({message: err});
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////                     SAVE TO DATABASE                   ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' , (req , res) => { //router.post as well as router.get are express methods

    console.log('(you are sending stuff to DB... [router.post() - PostRoute.js])');
    console.log (req.body);
    
    const loadData = new myData(
        {
            title: req.body.title, 
            description: req.body.description
        }
    );

    console.log('now saving data to DB [PostRoute.js]')
    
    loadData.save()
        .then ( data => {
            res.json(data);
            console.log('data:' , data);
        })
        .catch( err => {
            res.json({message: err});
        });
    
});

// data saved in mongodb: myapiapp.myposts
// myapiapp is the DB name defined in .env file (DB_CONNECTION_CREDENTIALS='mongodb://localhost:27017/myapiapp')
// anyway still cannot understabd where "myposts" pops out from.
// is not related to myDatas variable, already tested by changing it

module.exports = router;
