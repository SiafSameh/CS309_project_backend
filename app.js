const express = require("express")
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/user.model')

const mongouri = "mongodb://localhost:27017/data"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('server runing');
});





mongoose.set("strictQuery", false)
mongoose
.connect(mongouri)
.then(() => {
    console.log('connected to MongoDB')
    //listen on specific port 
    app.listen(3000, () => console.log('app started on port 3000'))
}).catch((error) => {
    console.log('cant connect to mongodb'+error)
})