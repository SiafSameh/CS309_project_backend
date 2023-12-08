const express = require("express")
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')

const mongouri = "mongodb://localhost:27017/data"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api/users" ,userRoutes);
app.use("/api/auth" ,authRoutes);
app.use("/api/products" ,productRoutes);
app.use("/api/cart", cartRoutes);

app.get('/', (req, res) => {
    res.send('server runing');
});


mongoose.set("strictQuery", false)
mongoose
.connect('mongodb://0.0.0.0:27017/data')
.then(() => {
    console.log('connected to MongoDB')
    //listen on specific port 
    app.listen(3000, () => console.log('app started on port 3000'))
}).catch((error) => {
    console.log('cant connect to mongodb'+error)
})