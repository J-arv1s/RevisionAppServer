const mongoose = require('mongoose')

const question_schema = new mongoose.Schema({
    question: String,
    answer: String,
})

const quiz = mongoose.model('quiz', new mongoose.Schema({
    quiz_name: String,
    questions: [ question_schema ],
}))

module.exports = quiz