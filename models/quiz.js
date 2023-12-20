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

quizSchema.statics.addQuestion = async function (name, questionData) {
    const quiz = await this.findByName(name)
    if (!quiz) {
        return {message: "Quiz does not exist"}
    }

    quiz.questions.push(questionData)
    const updatedQuiz = await quiz.save()

    return updatedQuiz
}

quizSchema.statics.deleteQuestion = async function (name, questionId) {
    const quiz = await this.findByName(name);
    if (!quiz) {
      return { message: "Quiz does not exist" };
    }
    // Find the index of the question with the given questionId
    const questionIndex = quiz.questions.findIndex((question) => question._id.toString() === questionId);
    if (questionIndex === -1) {
      return { message: "Question does not exist" };
    }
    // Remove the question from the questions array
    quiz.questions.splice(questionIndex, 1);
    const updatedQuiz = await quiz.save();
    return updatedQuiz;
  };

const Quiz = mongoose.model('Quiz', quizSchema)
const Question = mongoose.model('Question', quizSchema)

module.exports = { Quiz, Question }
