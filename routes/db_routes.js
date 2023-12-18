const { Router } = require('express')

const db_controller = require('../controllers/db_controller')
const db_router = Router()

db_router.get('/', db_controller.index)

module.exports = db_router