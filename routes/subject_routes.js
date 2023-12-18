const { Router } = require('express')

const subject_controller = require('../controllers/subject_controller')
const subject_router = Router()

subject_router.get('/', subject_controller.index)
subject_router.get('/:subjectname', subject_controller.show_by_name)

module.exports = subject_router