const user = require('../models/user')
const quiz = require('../models/quiz')

const index = async (req, res) => {
    const quizes = await quiz.find()
    res.status(200).json(quizes)
}

module.exports = {
    index
}
