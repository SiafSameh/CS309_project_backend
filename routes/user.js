
const User = require('../models/user.model')


const router = require("express").Router();


router.get('/listusers', async (req, res) => {
    try {
        const users = await User.find({ });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    } 
});


router.get('/find/:id', async (req, res) => {

    try {
        // req id 
        const id = req.params.id;
        // find by id in users 
        if(req.params.isAdmin){
        const user = await User.findById(id);
        res.status(200).json(user);
        } else res.status(200).json("You are not allowed")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.put('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        // if (req.body.id=== id || req.params.isAdmin) {
            const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
            res.status(200).json(user);
        // }else{
        //   return   res.status(403).send("cannot edit" );
        // }

    } catch (error) {
        res.status(500).send(error.message );
    }
});


module.exports =router;