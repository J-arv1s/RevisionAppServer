const quiz = require('../models/quiz')

const index = async (req, res) => {
    const quizes = await quiz.find()
    res.status(200).json(quizes)
}

const show = async (req, res) => {
    const { quizname } = req.params
    const q = await quiz.findByName(quizname)
    res.status(200).json(q)
}

const create = async (req, res) => {
    const data  = req.body
    const new_quiz = await quiz.createOne(data)
    res.status(201).json(new_quiz)
}

const update = async (req, res) => {
    const { quizname } = req.params
    const update_data = req.body

    const updated_quiz = await quiz.updateByName(quizname, update_data)
    res.status(200).json(updated_quiz)
}

const destroy = async (req, res) => {
    const { quizname } = req.params

    const deleted_quiz = await quiz.findOneAndDelete({quiz_name: quizname})
    res.status(204).json(deleted_quiz)
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}
