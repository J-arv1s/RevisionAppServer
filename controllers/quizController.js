const { default: mongoose } = require('mongoose')
const Quiz = require('../models/quiz')

const index = async (req, res) => {
    const quizzes = await Quiz.find()
    res.status(200).json(quizzes)
}

const show = async (req, res) => {
    const { quizname } = req.params
    const q = await Quiz.findByName(quizname)
    res.status(200).json(q)
}

const create = async (req, res) => {
    const data  = req.body
    const { subject } = req.body
    const newQuiz = await Quiz.createOne(data, subject)
    res.status(201).json(newQuiz)
}

const update = async (req, res) => {
    const { quizname } = req.params
    const updatedName = req.body.quizName

    const updatedQuiz = await Quiz.updateByName(quizname, updatedName)
    res.status(200).json(updatedQuiz)
}

const destroy = async (req, res) => {
    const { quizname } = req.params

    const deletedQuiz = await Quiz.findOneAndDelete({quizName: quizname})
    res.status(204).json(deletedQuiz)
}

const addQuestion = async (req, res) => {
    const { quizname } = req.params
    const questionData = req.body

    const updatedQuiz = await Quiz.addQuestion(quizname, questionData)
    res.status(201).json(updatedQuiz)
}

const removeQuestion = async (req, res) => {
    const { quizname, id } = req.params;

    const updatedQuiz = await Quiz.deleteQuestion(quizname, id);
    res.status(200).json(updatedQuiz);
};
 
module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    addQuestion,
    removeQuestion
}
