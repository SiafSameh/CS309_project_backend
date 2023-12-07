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

module.exports =router;