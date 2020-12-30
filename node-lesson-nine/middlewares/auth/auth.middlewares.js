const jwt = require('jsonwebtoken');

const { AUTHORIZATION } = require('../../constants/constants');
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../../configs/config');
const {
    ErrorHandler, errors: {
        EMAIL_OR_PASS_NOT_VALID,
        NOT_VALID_TOKEN,
        PERMISSION_DENIED,
        CONFLICT
    }
} = require('../../error');
const { newLoginValidator } = require('../../validators');
const { userService, authService } = require('../../services');
const { passwordHelper } = require('../../helpers');

module.exports = {
    checkAuthBodyComplete: async (req, res, next) => {
        try {
            const { error } = newLoginValidator.login.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, EMAIL_OR_PASS_NOT_VALID.code);
            }

            const { email, password } = req.body;
            const user = await userService.findUserByEmail(email);

            if (!user) {
                throw new ErrorHandler(EMAIL_OR_PASS_NOT_VALID.message, EMAIL_OR_PASS_NOT_VALID.code);
            }

            const isUserLoggedIn = await authService.findUserInAuthTable(user.id);

            if (isUserLoggedIn) {
                throw new ErrorHandler(CONFLICT.message, CONFLICT.code);
            }

            await passwordHelper.compare(password, user.password);

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
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

            const userWithToken = await authService.getTokenWithUserByParams(accessToken);

            if (!userWithToken) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            if (userWithToken.id !== +req.params.id) {
                throw new ErrorHandler(PERMISSION_DENIED.message, PERMISSION_DENIED.code);
            }

            req.user = userWithToken;
            req.accessToken = accessToken;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);

            if (!refreshToken) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            jwt.verify(refreshToken, REFRESH_TOKEN, (err) => {
                if (err) {
                    throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
                }
            });

            const userWithToken = await authService.getTokenWithUserByParams(refreshToken);

            if (!userWithToken) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            req.userWithToken = userWithToken;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessTokenForLogout: async (req, res, next) => {
        try {
            const accessTokenForLogout = req.get(AUTHORIZATION);

            if (!accessTokenForLogout) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            jwt.verify(accessTokenForLogout, ACCESS_TOKEN, (err) => {
                if (err) {
                    throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
                }
            });

            const userWithToken = await authService.getTokenWithUserByParams(accessTokenForLogout);

            if (!userWithToken) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            req.user = userWithToken;

            next();
        } catch (e) {
            next(e);
        }
    }
};
