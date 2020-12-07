const {
    findUserById,
    findUserByEmail
} = require('../services/users.service');

module.exports = {
    isUserBodyComplete: async (req, res, next) => {
        try {
            const { email, nickname, password } = req.body;

            if (!email && !nickname && !password) {
                throw new Error('All fields in form are required');
            }

            const user = await findUserByEmail(email);

            if (user.email) {
                throw new Error('This user is already registered.');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkUserIdValidity: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                throw new Error('Id does not exists');
            }

            if (id <= 0) {
                throw new Error('Id is not valid');
            }

            const user = await findUserById(id);

            if (!user) {
                throw new Error('User with this id is not found');
            }

            req.user = user;

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
};
