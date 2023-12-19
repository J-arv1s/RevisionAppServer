const express = require('express')
const cors = require('cors')

const logger = require('morgan')

//express app
const app = express()
app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.get('/', (req, res) => {
    res.json({
        "RevisionApp": "Welcome"
    })
})

module.exports = app


// const PORT = process.env.PORT || 3000;
// const MONGO_URL = process.env.MONGO_URI

// // adding express routes
// app.use('/app', db_routes)

// mongoose
//     .connect(MONGO_URL)

//     .then(()=> {
//         // seeding database
//         seed_DB()
//         // starting express server
//         app.listen(PORT, () => {
//             console.log(`Listening on port: ${PORT}`)
//         })
//     })
//     .catch((error)=> {
//         console.log(`Error connecting to MongoDB: ${error}`)
//     })
