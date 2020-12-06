const { Router } = require('express');
const {
    getAllUsers,
    registerUser,
    getUserById,
    deleteUserById,
    updateExistUser
} = require('../controllers/users.controller');
const {
    isUserAlreadyRegistered,
    checkUserIdValidity,
    checkUserBodyAndId
} = require('../middlewares/checkUsersValidity.middleware');

const usersRoute = Router();

usersRoute.get('/', getAllUsers);

usersRoute.post('/', isUserAlreadyRegistered, registerUser);

usersRoute.get('/:id', checkUserIdValidity, getUserById);

usersRoute.delete('/:id', checkUserIdValidity, deleteUserById);

usersRoute.put('/:id', checkUserBodyAndId, updateExistUser);

module.exports = usersRoute;
