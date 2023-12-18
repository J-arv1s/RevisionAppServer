const mongoose = require('mongoose')

const question_schema = new mongoose.Schema({
    question: String,
    answer: String,
})

const quiz_schema = new mongoose.Schema({
    quiz_name: String,
    questions: [ question_schema ],
})

quiz_schema.statics.get_by_name = function (name) {
    return this.find({ quiz_name: name})
}

quiz_schema.statics.create_one = async function (quiz_data) {
    const new_quiz = new this(quiz_data)
    await new_quiz.save()
    return new_quiz
}

module.exports = mongoose.model('quiz', quiz_schema)