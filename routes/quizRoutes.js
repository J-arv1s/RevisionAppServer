const { Router } = require('express')

const quizController = require('../controllers/quizController')
const quizRouter = Router()

quizRouter.get('/', quizController.index)
quizRouter.get('/:quizname', quizController.show)
quizRouter.post('/', quizController.create)
quizRouter.patch('/:quizname', quizController.update)
quizRouter.delete('/:quizname', quizController.destroy)

// question specifics
quizRouter.post('/question-add/:quizname', quizController.addQuestion)

module.exports = quizRouter
