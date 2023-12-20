const { Router } = require('express')

const userController = require('../controllers/userController')

const userRouter = Router();

userRouter.get('/', userController.index)
userRouter.get('/:username', userController.show)
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/:username", userController.destroy)
userRouter.patch("/:username", userController.update)

//get,update score
userRouter.get('/score/:username', userController.showScore)
userRouter.patch('/score/:username', userController.updateScore)


module.exports = userRouter;
