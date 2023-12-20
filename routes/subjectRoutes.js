const { Router } = require('express')

const subjectController = require('../controllers/subjectController')
const subjectRouter = Router()

subjectRouter.get('/', subjectController.index)
subjectRouter.get('/:subjectName', subjectController.show)
subjectRouter.post('/', subjectController.create)
subjectRouter.delete('/:subjectName', subjectController.destroy)
subjectRouter.patch('/:subjectName', subjectController.update)

module.exports = subjectRouter
