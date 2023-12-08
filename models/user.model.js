const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
// const validator = require('validator')
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: { type: String, required: [true, "please enter your name"] ,minlentgh: 3,maxlengh:30,uniqe: true},
        email: { type: String, unique: true, required: [true ,"please provide email"],
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            //  validate( value ) {
            //     if( !validator.isEmail( value )) {
            //         throw new Error( 'Email is invalid' )
            //     } }
            },
        
        password: { type: String, required: true },
        phoneNumber: { type: String, required: false },
        image: { type: String, required: false },
        bio: {type: String, required: false},
        isAdmin: {type: Boolean, default: false   }
        
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

// // Hashed the password before saving the user into database
// userSchema.pre("save", async function () {
//     // console.log(this.modifiedPaths());
//     // console.log(this.isModified("name"));
//     // Only run this 👇 function if password was modified (not on other update functions)
//     if (!this.isModified("password")) return
    
//     this.password = await bcrypt.hash(this.password, 10)
// })



const user= mongoose.model("User",userSchema)

module.exports = mongoose.model('User', userSchema);