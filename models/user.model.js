const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const validator = require('validator')
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: { type: String, required: [true, "please enter your name"] ,minlentgh: 3,maxlengh:30,uniqe: true},
        email: { type: String, unique: true, required: [true ,"please provide email"],
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
           
            },
        
        password: { type: String, required: true },
        phoneNumber: { type: String, required: false },
        image: { type: String, required: false },
        bio: {type: String, required: false},
        isAdmin: {type: Boolean, default: false },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
        
    },
    {
        timestamps: true
    }
 

);
//Hash plain password before saving
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    next()
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
     await user.save()
    return token
}



const user= mongoose.model("User",userSchema)

module.exports = mongoose.model('User', userSchema);