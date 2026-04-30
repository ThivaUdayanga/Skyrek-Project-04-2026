import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import autherizeUser from './lib/jwtMiddleware.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(
    autherizeUser
)

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI).then(
    () => {
        console.log("connect to MongoDB successfully")
    }
).catch(
    (err) => {
        console.log("failed to connect to MongoDB")
        console.error(err)
    }
)

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})