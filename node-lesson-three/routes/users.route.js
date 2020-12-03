const { Router } = require('express');
const {
    getAllUsers, registerUser, getUserByEmail, deleteUserByEmail, logoutUserByEmail
} = require('../controllers/users.controller');
const { isUserAlreadyRegistered, checkUserEmailValidity } = require('../middlewares/checkUsersValidity.middleware');

const usersRoute = Router();

usersRoute.get('/', getAllUsers);

usersRoute.post('/', isUserAlreadyRegistered, registerUser);

usersRoute.get('/:email', checkUserEmailValidity, getUserByEmail);

usersRoute.delete('/:email', checkUserEmailValidity, deleteUserByEmail);

usersRoute.get('/:email', checkUserEmailValidity, logoutUserByEmail);

module.exports = usersRoute;
