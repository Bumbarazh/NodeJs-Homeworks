const { Router } = require('express');
const {
    getAllUsers, registerUser, getUserByEmail, deleteUserByEmail
} = require('../controllers/users.controller');
const { isUserAlreadyRegistered, checkUserEmailValidity } = require('../middlewares/checkUsersValidity.middleware');

const usersRoute = Router();

usersRoute.get('/', getAllUsers);

usersRoute.post('/', isUserAlreadyRegistered, registerUser);

usersRoute.get('/:email', checkUserEmailValidity, getUserByEmail);

usersRoute.delete('/:email', checkUserEmailValidity, deleteUserByEmail);

module.exports = usersRoute;
