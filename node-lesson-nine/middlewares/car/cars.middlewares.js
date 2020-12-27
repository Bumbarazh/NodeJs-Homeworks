const jwt = require('jsonwebtoken');

const { carValidator } = require('../../validators');
const {
    ErrorHandler, errors: {
        BODY_IS_NOT_COMPLETE,
        NOT_VALID_TOKEN,
        NOT_VALID_ID,
        NOT_FOUND,
        PERMISSION_DENIED,
    }
} = require('../../error');
const { AUTHORIZATION } = require('../../constants/constants');
const { ACCESS_TOKEN } = require('../../configs/config');
const { authService, carService } = require('../../services');

module.exports = {
    isCarBodyComplete: async (req, res, next) => {
        try {
            const { error } = carValidator.newCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BODY_IS_NOT_COMPLETE.code);
            }

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

            const { user_id } = req.body;

            if (user_id !== userWithToken.id) {
                throw new ErrorHandler(PERMISSION_DENIED.message, PERMISSION_DENIED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAccessTokenAndParams: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id && id < 1) {
                throw new ErrorHandler(NOT_VALID_ID.message, NOT_VALID_ID.code);
            }

            const accessToken = req.get(AUTHORIZATION);

            if (!accessToken) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            jwt.verify(accessToken, ACCESS_TOKEN, (err) => {
                if (err) {
                    throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
                }
            });

            const car = await carService.findCarById(id);

            if (!car) {
                throw new ErrorHandler(NOT_FOUND.message, NOT_FOUND.code);
            }

            const userWithToken = await authService.getTokenWithUserByParams(accessToken);

            if (!userWithToken) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            if (userWithToken.id !== car.user_id) {
                throw new ErrorHandler(PERMISSION_DENIED.message, PERMISSION_DENIED.code);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkParamsToUpdate: async (req, res, next) => {
        try {
            const { error } = carValidator.updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BODY_IS_NOT_COMPLETE.code);
            }

            const { id } = req.params;

            if (!id && id < 1) {
                throw new ErrorHandler(NOT_VALID_ID.message, NOT_VALID_ID.code);
            }

            const accessToken = req.get(AUTHORIZATION);

            if (!accessToken) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            jwt.verify(accessToken, ACCESS_TOKEN, (err) => {
                if (err) {
                    throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
                }
            });

            const car = await carService.findCarById(id);

            if (!car) {
                throw new ErrorHandler(NOT_FOUND.message, NOT_FOUND.code);
            }

            const userWithToken = await authService.getTokenWithUserByParams(accessToken);

            if (!userWithToken) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            if (userWithToken.id !== car.user_id) {
                throw new ErrorHandler(PERMISSION_DENIED.message, PERMISSION_DENIED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
