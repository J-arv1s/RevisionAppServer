const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const userRoutes = require('./routes/userRoutes')
const subjectRoutes = require('./routes/subjectRoutes')
const quizRoutes = require('./routes/quizRoutes')

//express app
const app = express()
app.use(express.json())
app.use(cors())
app.use(logger('dev'))

// adding express routes
app.use('/users', userRoutes)
app.use('/subjects', subjectRoutes)
app.use('/quizzes', quizRoutes)

app.get('/', (req, res) => {
    res.json({
        "RevisionApp": "Welcome"
    })
})


module.exports = app