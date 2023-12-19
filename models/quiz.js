const mongoose = require('mongoose')

const question_schema = new mongoose.Schema({
    question: String,
    answer: String,
})

const quiz_schema = new mongoose.Schema({
    quiz_name: String,
    questions: [ question_schema ],
})

quiz_schema.statics.findByName = function (name) {
    return this.findOne({ quiz_name: name})
}

quiz_schema.statics.createOne = async function (quiz_data) {
    const new_quiz = new this(quiz_data)
    await new_quiz.save()
    return new_quiz
}

quiz_schema.statics.updateByName = async function (name, update_data) {
    const quiz = await this.findByName(name)

    // if update_data has a quiz_name then it is assigned to quiz otherwise it keeps what it already has
    quiz.quiz_name = update_data.quiz_name || quiz.quiz_name
    // if update_data has a questions arr then it is assigned to quiz otherwise it keeps what it already has
    quiz.questions = update_data.questions || quiz.questions

    const updated_quiz = await quiz.save()
    return updated_quiz
}

const quiz = mongoose.model('quiz', quiz_schema)

module.exports = quiz