require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

//express app
const app = express()
mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        app.listen(process.env.PORT, () => {
        console.log('Listening on port',process.env.PORT)
    })
})
.catch((error)=> {
    console.log(error)
})