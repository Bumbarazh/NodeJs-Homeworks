const {
    findAllUsers,
    insertUser,
    findUserById,
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

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await findUserById(id);

            if (!user) {
                throw new Error('User with this id is not found');
            }

            res.status(302).json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    registerUser: async (req, res) => {
        try {
            const user = req.body;

            const users = await findAllUsers();

            if (users.find((oneUser) => oneUser.email === user.email)) {
                throw new Error('This email is already registered.');
            }

            insertUser(user);

            isUserLoggedIn = !isUserLoggedIn;

            res.status(201).json('User is created');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    deleteUserById: (req, res) => {
        try {
            const { id } = req.params;

            const user = findUserById(id);

            if (!user) {
                throw new Error('User with this email is not found');
            }

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
