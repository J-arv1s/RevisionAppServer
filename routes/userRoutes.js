const { Router } = require('express')

const userController = require('../controllers/userController')

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get('/', userController.index)
userRouter.get('/:username', userController.show)

module.exports = userRouter;
