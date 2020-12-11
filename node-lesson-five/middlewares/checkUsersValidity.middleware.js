const {
    ErrorHandler, errors: {
        USER_ALREADY_REGISTERED,
        BODY_IS_NOT_COMPLETE,
        USER_IS_NOT_FOUND,
        NOT_VALID_ID
    }
} = require('../error');

const { userService } = require('../services');

module.exports = {
    isUserBodyComplete: async (req, res, next) => {
        try {
            const { email, nickname, password } = req.body;

            if (!email && !nickname && !password) {
                throw new ErrorHandler(BODY_IS_NOT_COMPLETE.message, BODY_IS_NOT_COMPLETE.code);
            }

            const user = await userService.findUserByEmail(email);

            if (user.length > 0) {
                throw new ErrorHandler(USER_ALREADY_REGISTERED.message, USER_ALREADY_REGISTERED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserIdValidity: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id || id <= 0) {
                throw new ErrorHandler(NOT_VALID_ID.message, NOT_VALID_ID.code);
            }

            const user = await userService.findUserById(id);

            if (user.length < 1) {
                throw new ErrorHandler(USER_IS_NOT_FOUND.message, USER_IS_NOT_FOUND.code);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
