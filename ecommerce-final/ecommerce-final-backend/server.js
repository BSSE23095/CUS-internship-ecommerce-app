import 'dotenv/config'
import express from "express"
import cors from "cors"
import connectdb from "./config/mongodb.js"
import userRouter from "./routes/userRoute.js"
import connectCloudinary from "./config/cloudinary.js";
import productRouter from './routes/productRoute.js'
import orderRouter from './routes/orderRoute.js'


//app config
const app = express()
const port = process.env.PORT || 4000

connectdb()
connectCloudinary()
console.log("Cloud name:", process.env.CLOUDINARY_NAME)
console.log("API key:", process.env.CLOUDINARY_API_KEY)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//api end points
app.use('/api/user', userRouter);
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res)=> {
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log("Server started on PORT: "+port)
})

console.log("JWT_SECRET Loaded:", process.env.JWT_SECRET);