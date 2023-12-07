const User = require('../models/user.model')


const router = require("express").Router();


router.get('/listusers', async (req, res) => {
    try {
        const users = await User.find({ role: "user"});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    } 
});

router.get('/user/:id', async (req, res) => {
    
    try {
        // req id 
        const id = req.params.id;
        // find by id in users 
        
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.get('/user/:email', async(req,res) =>{
    try {
        const email = req.params.email;
        const user = await User.findOne({email:email});
        if (!user) {
            return res.status(404).send(  `User with email  not found`)
        }
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports =router;