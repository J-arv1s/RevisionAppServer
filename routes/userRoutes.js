const { Router } = require('express')

const userController = require('../controllers/userController')

const userRouter = Router();

userRouter.get('/', userController.index)
userRouter.get('/:username', userController.show)
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/:id", userController.destroy)

module.exports = userRouter;
