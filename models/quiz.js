const mongoose = require('mongoose')
const { Schema } = mongoose;

const questionSchema = new Schema({
    question: String,
    answer: String,
})

const quizSchema = new Schema({
    quizName: String,
    questions: [ questionSchema ],
})

// const Question = mongoose.model('Question', quizSchema)


quizSchema.statics.findByName = function (name) {
    return this.findOne({ quizName: name})
}

quizSchema.statics.createOne = async function (quizData) {
    const newQuiz = new this(quizData)
    await newQuiz.save()
    return newQuiz
}

quizSchema.statics.updateByName = async function (name, updateData) {
    const quiz = await this.findByName(name)
    // if update_data has a quiz_name then it is assigned to quiz otherwise it keeps what it already has
    quiz.name = updateData.quizName || quiz.name
    
    const updatedQuiz = await quiz.save()
    return updatedQuiz
}

quizSchema.statics.addQuestion = async function (name, newQuestion) {
    const quiz = await this.findByName(name)
    if (!quiz) {
        return {message: "Quiz not found"}
    }
    
    quiz.questions.push(newQuestion)
    const updatedQuiz = await quiz.save()
    
    return updatedQuiz
}

quizSchema.methods.removeQuestion = async function (questionID) {
    try {
        this.questions.pull({ _id: questionID})
        await this.save
        return {message: "Question deleted successfully"}

    } catch (error) {
        console.error('Error deleting: ', error)
        throw new Error('Failed to delete question')
    }
}

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz