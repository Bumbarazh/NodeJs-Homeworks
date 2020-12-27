const { tokenizer } = require('../../helpers');
const { authService } = require('../../services');
const { AUTHORIZATION } = require('../../constants/constants');
const { errors: { NO_CONTENT } } = require('../../error');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { id } = req.user;
            const tokenPair = tokenizer();

            await authService.insertTokenPair({ user_id: id, ...tokenPair });

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
            const accessTokenForLogout = req.get(AUTHORIZATION);

            await authService.removeToken(accessTokenForLogout);

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
