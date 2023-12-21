const mongoose = require('mongoose')
const { Schema } = mongoose;
const Subject = require('./subject')

const questionSchema = new Schema({
    question: String,
    answer: String,
    wrongAnswers: [String]
})

const quizSchema = new Schema({
    quizName: String,
    questions: [ questionSchema ],
})


quizSchema.statics.findByName = function (name) {
    return this.findOne({ quizName: name})
}

quizSchema.statics.createOne = async function (quizData, name) {
    const newQuiz = new this(quizData)
    await newQuiz.save()

    await Subject.findOneAndUpdate({subjectName: name},
        { $push: { quizzesId: newQuiz._id }},
        { new: true }
    )

    return newQuiz
}

quizSchema.statics.updateByName = async function (name, updateData) {
    const quiz = await this.findByName(name)
    // if update_data has a quiz_name then it is assigned to quiz otherwise it keeps what it already has
    quiz.quizName = updateData.quizName || quiz.quizName
    
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

quizSchema.statics.deleteQuestion = async function (name, questionId) {
    const quiz = await this.findByName(name);
    if (!quiz) {
      return { message: "Quiz does not exist" };
    }

    const questionIndex = quiz.questions
        .findIndex((question) => question._id
        .toString() === questionId);
    
    if (questionIndex === -1) {
      return { message: "Question does not exist" };
    }

    quiz.questions.splice(questionIndex, 1);
    const updatedQuiz = await quiz.save();
    return updatedQuiz;
};

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz