const {
    findAllUsers,
    insertUser,
    removeUserById,
    updateUser
} = require('../services/users.service');

let { isUserLoggedIn } = require('../variables/lets');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await findAllUsers();

            if (users.length < 1) {
                throw new Error('Users aren\'t found');
            }

            res.status(201).json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            const { user } = req;

            res.status(302).json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    registerUser: async (req, res) => {
        try {
            const user = req.body;

            await insertUser(user);

            isUserLoggedIn = !isUserLoggedIn;

            res.status(201).json('User is created');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    deleteUserById: (req, res) => {
        try {
            const { id } = req.params;

            if (!isUserLoggedIn) {
                throw new Error('User can\'t remove, he is not logged in.');
            }

            removeUserById(id);

            res.status(204).json('User deleted');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    updateExistUser: async (req, res) => {
        try {
            const user = req.body;

            const { id } = req.params;

            if (!isUserLoggedIn) {
                throw new Error('User can\'t update, he is not logged in.');
            }

            await updateUser(user, id);

            res.status(204).json('User is updated');
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
