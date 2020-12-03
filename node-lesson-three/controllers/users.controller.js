const {
    findAllUsers, insertUser, findUserByEmail, removeUserByEmail
} = require('../services/users.service');

let { isUserLoggedIn } = require('../variables/lets');

module.exports = {
    getAllUsers: (req, res) => {
        try {
            const users = findAllUsers();

            if (users.length < 1) {
                throw new Error('Users aren\'t found');
            }

            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    registerUser: (req, res) => {
        try {
            const user = req.body;

            const users = findAllUsers();

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

    getUserByEmail: (req, res) => {
        try {
            const { email } = req.params;

            const user = findUserByEmail(email);

            if (!user) {
                throw new Error('User with this email is not found');
            }

            res.status(302).json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    deleteUserByEmail: (req, res) => {
        try {
            const { email } = req.params;

            const user = findUserByEmail(email);

            if (!user) {
                throw new Error('User with this email is not found');
            }

            if (!isUserLoggedIn) {
                throw new Error('User can\'t remove, he is not logged in.');
            }

            removeUserByEmail(email);

            res.status(204).json('User deleted');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    logoutUserByEmail: (req, res) => {
        try {
            const { email } = req.params;

            const user = findUserByEmail(email);

            if (!user) {
                throw new Error('User with this email is not found');
            }

            if (!isUserLoggedIn) {
                throw new Error('User can\'t logout, he is not logged in.');
            }

            isUserLoggedIn = !isUserLoggedIn;

            res.status(201).json('User is log out');
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
