const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: { type: String, required: [true, "please enter your name"] ,minlentgh: 3,maxlengh:30},
        email: { type: String, unique: true, required: [true ,"please provide email"],
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ },
        
        password: { type: String, required: true },
        phoneNumber: { type: String, required: false },
        image: { type: String, required: false },
        bio: {type: String, required: false},
        role: {type: String, default: "user" , enum: [ "admin", "user"] }
        
    },
    {
        timestamps: true
    }
 

);
// Hashed the password before saving the user into database
userSchema.pre("save", async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified("name"));
    // Only run this 👇 function if password was modified (not on other update functions)
    if (!this.isModified("password")) return
    
    this.password = await bcrypt.hash(this.password, 10)
})



const user= mongoose.model("User",userSchema)

module.exports = mongoose.model('User', userSchema);