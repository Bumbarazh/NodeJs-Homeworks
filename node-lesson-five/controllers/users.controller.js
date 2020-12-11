const {
    ErrorHandler, errors: {
        NOT_LOGGED_IN
    }
} = require('../error');

const { userService } = require('../services');

let { isUserLoggedIn } = require('../variables/lets');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();

            res.status(201).json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    registerUser: async (req, res, next) => {
        try {
            const user = req.body;

            await userService.insertUser(user);

            isUserLoggedIn = !isUserLoggedIn;

            res.status(201).json('User is created');
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: (req, res, next) => {
        try {
            const { id } = req.params;

            if (!isUserLoggedIn) {
                throw new ErrorHandler(NOT_LOGGED_IN.message, NOT_LOGGED_IN.code);
            }

            userService.removeUserById(id);

            res.status(204).json('User deleted');
        } catch (e) {
            next(e);
        }
    },

    updateExistUser: async (req, res, next) => {
        try {
            const user = req.body;

            const { id } = req.params;

            if (!isUserLoggedIn) {
                throw new ErrorHandler(NOT_LOGGED_IN.message, NOT_LOGGED_IN.code);
            }

            await userService.updateUser(user, id);

            res.status(201).json('User is updated');
        } catch (e) {
            next(e);
        }
    }
};
