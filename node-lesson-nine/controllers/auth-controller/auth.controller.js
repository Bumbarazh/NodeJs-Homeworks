const { tokenizer } = require('../../helpers');
const { authService, logService } = require('../../services');
const { AUTHORIZATION, USER_IS_LOGGED_IN, USER_LOGGED_OUT } = require('../../constants/constants');
const { errors: { NO_CONTENT } } = require('../../error');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { id } = req.user;
            const tokenPair = tokenizer();

            await authService.insertTokenPair({ user_id: id, ...tokenPair });

            await logService.createLogs({
                action: USER_IS_LOGGED_IN,
                time_of_action: new Date(),
                user_id: id
            });
            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { id } = req.userWithToken;
            const tokenPair = tokenizer();

            await authService.updateTokenPair(id, tokenPair);

            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    },
    logOutUser: async (req, res, next) => {
        try {
            const { user } = req;
            const accessTokenForLogout = req.get(AUTHORIZATION);

            await authService.removeToken(accessTokenForLogout);

            await logService.createLogs({
                action: USER_LOGGED_OUT,
                time_of_action: new Date(),
                user_id: user.id
            });
            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
