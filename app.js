require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const { seed_DB } = require('./db/seed')

const user_routes = require('./routes/user_routes')
const subject_routes = require('./routes/subject_routes')
const quiz_routes = require('./routes/quiz_routes')

//express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(logger('dev'))

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL 

// adding express routes
app.use('/users', user_routes)
app.use('/subjects', subject_routes)
app.use('/quizes', quiz_routes)

mongoose.connect(MONGO_URL)
    .then(()=> {
        // seeding database
        seed_DB()
        // starting express server
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`)
        })
    })
    .catch((error)=> {
        console.log(`Error connecting to MongoDB: ${error}`)
    })