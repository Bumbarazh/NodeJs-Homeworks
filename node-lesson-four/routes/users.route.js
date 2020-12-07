const { Router } = require('express');
const {
    getAllUsers,
    registerUser,
    getUserById,
    deleteUserById,
    updateExistUser
} = require('../controllers/users.controller');
const {
    isUserBodyComplete,
    checkUserIdValidity
} = require('../middlewares/checkUsersValidity.middleware');

const usersRoute = Router();

usersRoute.get('/', getAllUsers);

usersRoute.post('/', isUserBodyComplete, registerUser);

usersRoute.get('/:id', checkUserIdValidity, getUserById);

usersRoute.delete('/:id', checkUserIdValidity, deleteUserById);

usersRoute.put('/:id', checkUserIdValidity, updateExistUser);

module.exports = usersRoute;
