const { Router } = require('express')

const subjectController = require('../controllers/subjectController')
const subjectRouter = Router()

subjectRouter.get('/', subjectController.index)
subjectRouter.get('/:subjectname', subjectController.show_by_name)

module.exports = subjectRouter
