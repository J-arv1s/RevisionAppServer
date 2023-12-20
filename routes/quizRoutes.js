const { Router } = require('express')

const quizController = require('../controllers/quizController')
const quizRouter = Router()
const questionRouter = Router()

quizRouter.get('/', quizController.index)
quizRouter.get('/:quizname', quizController.show)
quizRouter.post('/', quizController.create)
quizRouter.patch('/:quizname', quizController.update)
quizRouter.delete('/:quizname', quizController.destroy)

// question specifics
quizRouter.post('/add/:quizname', quizController.createQuestion)
quizRouter.delete('/remove/:quizname/:id', quizController.destroyQuestion)

module.exports = quizRouter
