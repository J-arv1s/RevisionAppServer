const quiz = require('../models/quiz')

const index = async (req, res) => {
    const quizes = await quiz.find()
    res.status(200).json(quizes)
}

const show = async (req, res) => {
    const { quizname } = req.params
    const q = await quiz.get_by_name(quizname)
    res.status(200).json(q)
}

const create = async (req, res) => {
    const { quiz_name, questions}  = req.body
    const new_quiz = await quiz.create_one(quiz_name, questions)
    res.status(201).json(new_quiz)
}

module.exports = {
    index,
    show,
    create
}
