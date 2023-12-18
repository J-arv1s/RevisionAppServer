const { Router } = require('express')

const user_controller = require('../controllers/user_controller')
const user_router = Router()

user_router.get('/', user_controller.index)
user_router.get('/:username', user_controller.show_by_name)
user_router.post('/', user_controller.create)

module.exports = user_router