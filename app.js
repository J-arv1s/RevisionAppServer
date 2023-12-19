require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const db_routes = require('./routes/db_routes')
const { seed_DB } = require('./db/seed')

//express app
const app = express()

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI

// adding express routes
app.use('/app', db_routes)

mongoose
    .connect(MONGO_URL)

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
