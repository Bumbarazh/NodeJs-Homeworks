const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddlewares, authMiddlewares, fileMiddleware } = require('../middlewares');

const usersRouter = Router();

usersRouter.get('/', userController.getAllUsers);
usersRouter.post('/',
    userMiddlewares.isUserBodyComplete,
    fileMiddleware.checkAvatarForUser,
    userController.registerUser);
usersRouter.get('/:id', authMiddlewares.checkAccessToken, userController.getUserById);
usersRouter.delete('/:id', authMiddlewares.checkAccessToken, userController.deleteUserById);
usersRouter.put('/:id', userMiddlewares.checkParamsToUserUpdate, userController.updateExistUser);

module.exports = usersRouter;
