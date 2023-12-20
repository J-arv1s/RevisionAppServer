const { Router } = require('express')

const subjectController = require('../controllers/subjectController')
const subjectRouter = Router()

subjectRouter.get('/', subjectController.index)
subjectRouter.get('/:subject_name', subjectController.show)
subjectRouter.post('/', subjectController.create)
subjectRouter.delete('/:subject_name', subjectController.destroy)

module.exports = subjectRouter
