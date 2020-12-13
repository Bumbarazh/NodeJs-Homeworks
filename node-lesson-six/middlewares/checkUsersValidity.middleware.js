const {
    ErrorHandler, errors: {
        USER_ALREADY_REGISTERED,
        BODY_IS_NOT_COMPLETE,
        USER_IS_NOT_FOUND,
        NOT_VALID_ID
    }
} = require('../error');

const { newUserValidator } = require('../validators');

const { userService } = require('../services');

module.exports = {
    isUserBodyComplete: async (req, res, next) => {
        try {
            const { error } = newUserValidator.userRegisterValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BODY_IS_NOT_COMPLETE.code);
            }

            const user = await userService.findUserByEmail(req.body.email);

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

    checkUserNameToUpdate: async (req, res, next) => {
        try {
            const { error } = newUserValidator.userUpdateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BODY_IS_NOT_COMPLETE.code);
            }

            const { id } = req.params;

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
