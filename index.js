require("dotenv").config()

const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App connected to DB and listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
