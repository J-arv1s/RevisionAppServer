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
    return this.find({ quiz_name: name})
}

quiz_schema.statics.createOne = async function (quiz_data) {
    const new_quiz = new this(quiz_data)
    await new_quiz.save()
    return new_quiz
}

quiz_schema.statics.updateOne = async function (name, update_data) {
    const quiz_to_update = await this.findByName(name)

    quiz_to_update.quiz_name 
        //check if a updated name is being passed through, if so update it
        ? update_data.quiz_name 
        //if not leave it the same
        : quiz_to_update.quiz_name;

    quiz_to_update.questions 
        //check if a updated questions array is being passed through, if so update it
        ? update_data.questions 
        //if not leave it the same
        : quiz_to_update.questions;

    const updated_quiz = await quiz_to_update.save()
    return updated_quiz
}

module.exports = mongoose.model('quiz', quiz_schema)