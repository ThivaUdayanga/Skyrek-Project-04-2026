import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'

const app = express()

app.use(express.json())

const mongoURI = "mongodb://admin:1234@ac-ie5f5aa-shard-00-00.92yqpkf.mongodb.net:27017,ac-ie5f5aa-shard-00-01.92yqpkf.mongodb.net:27017,ac-ie5f5aa-shard-00-02.92yqpkf.mongodb.net:27017/?ssl=true&replicaSet=atlas-ljqfpq-shard-0&authSource=admin&appName=Cluster0"

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

app.use('/users', userRouter)

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})