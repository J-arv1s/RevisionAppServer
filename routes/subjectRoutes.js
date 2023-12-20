const { Router } = require('express')

const subjectController = require('../controllers/subjectController')
const subjectRouter = Router()

subjectRouter.get('/', subjectController.index)
subjectRouter.get('/:subjectname', subjectController.show)
subjectRouter.post('/', subjectController.create)
subjectRouter.delete('/:subjectname', subjectController.destroy)

module.exports = subjectRouter
