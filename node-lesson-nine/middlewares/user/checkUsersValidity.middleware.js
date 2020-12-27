const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN } = require('../../configs/config');
const { AUTHORIZATION } = require('../../constants/constants');
const {
    ErrorHandler, errors: {
        BODY_IS_NOT_COMPLETE,
        CONFLICT,
        NOT_VALID_TOKEN,
        PERMISSION_DENIED
    }
} = require('../../error');
const { newUserValidator } = require('../../validators');
const { userService, authService } = require('../../services');

module.exports = {
    isUserBodyComplete: async (req, res, next) => {
        try {
            const { error } = newUserValidator.userRegisterValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BODY_IS_NOT_COMPLETE.code);
            }

            const user = await userService.findUserByEmail(req.body.email);

            if (user) {
                throw new ErrorHandler(CONFLICT.message, CONFLICT.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkParamsToUserUpdate: async (req, res, next) => {
        try {
            const accessToken = req.get(AUTHORIZATION);

            if (!accessToken) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            jwt.verify(accessToken, ACCESS_TOKEN, (err) => {
                if (err) {
                    throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
                }
            });

            const { error } = newUserValidator.userUpdateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BODY_IS_NOT_COMPLETE.code);
            }

            const userWithToken = await authService.getTokenWithUserByParams(accessToken);

            if (!userWithToken) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            const { id } = req.params;

            if (userWithToken.id !== +id) {
                throw new ErrorHandler(PERMISSION_DENIED.message, PERMISSION_DENIED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
