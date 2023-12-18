const user_account = require('../models/user_account')
const quiz = require('../models/quiz')

const index = async (req, res) => {
    const quizes = await quiz.find()
    res.status(200).json(quizes)
}

module.exports = {
    index
}