const db = require('../../dataBase').getInstance();

const { USER_MODEL_NAME, OAUTH_MODEL_NAME } = require('../../constants/constants');

module.exports = {
    insertTokenPair: (tokenPair) => {
        const O_AuthModel = db.getModel(OAUTH_MODEL_NAME);

        O_AuthModel.create(tokenPair);
    },
    findUserInAuthTable: (id) => {
        const O_authModel = db.getModel(OAUTH_MODEL_NAME);

        const userTokens = O_authModel.findOne({
            where: {
                user_id: id
            }
        });

        return userTokens && userTokens.dataValues;
    },
    getTokenWithUserByParams: async (accessToken) => {
        const UserModel = db.getModel(USER_MODEL_NAME);
        const O_authModel = db.getModel(OAUTH_MODEL_NAME);

        const user = await UserModel.findOne({
            include: {
                model: O_authModel,
                where: {
                    access_token: accessToken
                }
            }
        });

        return user && user.dataValues;
    },
    updateTokenPair: (id, tokenPair) => {
        const O_authModel = db.getModel(OAUTH_MODEL_NAME);

        return O_authModel.update(tokenPair, {
            where: {
                user_id: id
            }
        });
    },
    removeToken: (accessToken, transaction) => {
        const O_authModel = db.getModel(OAUTH_MODEL_NAME);

        return O_authModel.destroy({
            where: {
                accessToken
            },
            transaction
        });
    }
};
