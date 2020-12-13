const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddlewares } = require('../middlewares');

const usersRoute = Router();

usersRoute.get('/', userController.getAllUsers);

usersRoute.post('/', userMiddlewares.isUserBodyComplete, userController.registerUser);

usersRoute.get('/:id', userMiddlewares.checkUserIdValidity, userController.getUserById);

usersRoute.delete('/:id', userMiddlewares.checkUserIdValidity, userController.deleteUserById);

usersRoute.put('/:id', userMiddlewares.checkUserNameToUpdate, userController.updateExistUser);

module.exports = usersRoute;
