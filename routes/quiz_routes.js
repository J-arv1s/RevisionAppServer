const { Router } = require('express')

const quiz_controller = require('../controllers/quiz_controller')
const quiz_router = Router()

quiz_router.get('/', quiz_controller.index)
quiz_router.get('/:quizname', quiz_controller.show)
quiz_router.post('/', quiz_controller.create)
quiz_router.patch('/:quizname', quiz_controller.update)
quiz_router.delete('/:quizname', quiz_controller.destroy)

module.exports = quiz_router