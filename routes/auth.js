const router = require("express").Router();
const res = require("express/lib/response");
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const CryptoJS = require("crypto-js");

// register, signin  , signup
router.post('/adduser',  async (req, res) => {
    
    try{
        //get user object from body 
        let userParam = req.body;
        // validate
        if (await User.findOne({ email: userParam.email })) {
            res.send( " is already exist");
        }
        const newUser = new User(userParam);
        
         await newUser.save();
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
        res.status(200).json(user)
         const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});
    } catch (error) {
        res.status(500).send('server error: '+ err);
    }
//     try{
//         const user = await User.findOne(
//             {
//                 userName: req.body.user_name
//             }
//         );

//         !user && res.status(401).json("Wrong User Name");

//         const hashedPassword = CryptoJS.AES.decrypt(
//             user.password,
//             process.env.PASS_SEC
//         );


//         const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

//         const inputPassword = req.body.password;
        
//         originalPassword != inputPassword && 
//             res.status(401).json("Wrong Password");

//         const accessToken = jwt.sign(
//         {
//             id: user._id,
//             isAdmin: user.isAdmin,
//         },
//         process.env.JWT_SEC,
//             {expiresIn:"3d"}
//         );
  
//         const { password, ...others } = user._doc;  
//         res.status(200).json({...others, accessToken});

//     }catch(err){
//         res.status(500).json(err);
//     }
})

module.exports =router;

// const router = require("express").Router();
// const res = require("express/lib/response");
// const User = require('../models/user.model')
// const bcrypt = require('bcrypt')

// // register, signin  , signup
// router.post('/adduser',  async (req, res) => {

//     try{
//         //get user object from body 
//         let userParam = req.body;
//         // validate
//         if (await User.findOne({ email: userParam.email })) {
//             res.send( " is already exist");
//         }
//         const user = new User(userParam);

//          await user.save();
//          res.send("user added successfully ")

//     }catch(err)
//     {
//         res.status(500).send('server error: '+ err);
//     }

// });
// router.post('/login',async(req,res)=> {

//     try {
//         const user= await User.findOne({email: req.body.email})
//         if(!user){
//            res.status(401).json("wrong password or email")
//         }
//         const ismatch = await bcrypt.compare(req.body.password,user.password)
//         console.log(ismatch)
//         if(!ismatch){res.status(401).json("wrong password or email")}
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(500).send('server error: '+ err);
//     }
// })

// module.exports =router;