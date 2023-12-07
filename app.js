const express = require("express")
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/user.model')
const userRoutes = require('./routes/user')

const mongouri = "mongodb://localhost:27017/data"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/listusers" ,userRoutes);

app.get('/', (req, res) => {
    res.send('server runing');
});

// app.get('/listusers', async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// });






mongoose.set("strictQuery", false)
mongoose
.connect("mongodb://localhost:27017/data")
.then(() => {
    console.log('connected to MongoDB')
    //listen on specific port 
    app.listen(8000, () => console.log('app started on port 3000'))
}).catch((error) => {
    console.log('cant connect to mongodb'+error)
})