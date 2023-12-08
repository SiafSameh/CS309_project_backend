const router = require("express").Router();
const res = require("express/lib/response");
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

//  signin  , signup
router.post('/adduser',  async (req, res) => {

    try{
        //get user object from body 
        let userParam = req.body;
        // validate
        if (await User.findOne({ email: userParam.email })) {
            res.send( " is already exist");
        }
        const user = new User(userParam);
        const token = await user.generateAuthToken()

         await user.save();
         res.status(201).send({user, token})
         res.send("user added successfully ")

    }catch(err)
    {
        res.status(500).send('server error: '+ err);
    }
    
});
router.post('/login',async(req,res)=> {
    
    try {
        const user= await User.findOne({email: req.body.email})
        if(!user){
           res.status(401).json("wrong password or email")
        }
        const ismatch = await bcrypt.compare(req.body.password,user.password)
        console.log(ismatch)
        if(!ismatch){res.status(401).json("wrong password or email")}
        // res.status(200).json(user)
        const token = await user.generateAuthToken()
        res.send({ user, token})    
        // const accessToken = jwt.sign(
        //     {
        //         id: user._id,
        //         isAdmin: user.isAdmin,
        //     },
        //     process.env.JWT_SEC,
        //         {expiresIn:"3d"}
        //     );
      
        //     const { password, ...others } = user._doc;  
        //     res.status(200).json({...others, accessToken});
    } catch (error) {
        res.status(500).send('server error: '+ err);
    }
})

module.exports =router;