const db = require('../../dataBase').getInstance();

const { USER_MODEL_NAME, CAR_MODEL_NAME } = require('../../constants/constants');

module.exports = {
    findAllUsers: () => {
        const UserModel = db.getModel(USER_MODEL_NAME);
        const CarModel = db.getModel(CAR_MODEL_NAME);

        return UserModel.findAll({
            include: [{
                model: CarModel,
                required: false
            }]
        });
    },

    findUserByEmail: (email) => {
        const UserModel = db.getModel(USER_MODEL_NAME);

        return UserModel.findOne({
            where: {
                email
            }
        });
    },

    findUserById: (userId) => {
        const UserModel = db.getModel(USER_MODEL_NAME);

        return UserModel.findAll({
            where: {
                id: userId
            }
        });
    },

    insertUser: (user) => {
        const UserModel = db.getModel(USER_MODEL_NAME);

        return UserModel.create(user);
    },

    removeUserById: (id) => {
        const UserModel = db.getModel(USER_MODEL_NAME);

        return UserModel.destroy({
            where: {
                id
            }
        });
    },

    updateUser: (nick, id) => {
        const UserModel = db.getModel(USER_MODEL_NAME);

        return UserModel.update(nick, {
            where: {
                id
            }
        });
    },

    updateUserById: (id, user) => {
        const UserModel = db.getModel('User');

        return UserModel.update(user, {
            where: { id },
            returning: true,
            plain: true
        });
    }
};
