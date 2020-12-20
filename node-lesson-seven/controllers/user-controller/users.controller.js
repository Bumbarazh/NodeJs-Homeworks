const {
    DELETED,
    USER_IS_UPDATED,
    CREATED
} = require('../../constants/constants');
const { userService, authService } = require('../../services');
const { passwordHelper } = require('../../helpers');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    registerUser: async (req, res, next) => {
        try {
            const password = await passwordHelper.hash(req.body.password);

            Object.assign(req.body, { password });

            await userService.insertUser(req.body);

            res.json(CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { accessToken } = req;

            await userService.removeUserById(id);
            await authService.removeToken(accessToken);

            res.json(DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateExistUser: async (req, res, next) => {
        try {
            const { nickname } = req.body;
            const { id } = req.params;

            await userService.updateUser(nickname, id);

            res.json(USER_IS_UPDATED);
        } catch (e) {
            next(e);
        }
    }
};
