const db = require('../dataBase').getInstance();

module.exports = {
    findAllUsers: () => {
        const UserModel = db.getModel('User');
        const CarModel = db.getModel('Car');

        return CarModel.findAll({
            include: {
                model: UserModel
            }
        });
    },

    findUserByEmail: (email) => {
        const UserModel = db.getModel('User');

        return UserModel.findAll({
            where: {
                email
            }
        });
    },

    findUserById: (userId) => {
        const UserModel = db.getModel('User');
        const CarModel = db.getModel('Car');

        return CarModel.findAll({
            include: {
                model: UserModel,
                where: {
                    id: userId
                }
            }
        });
    },

    insertUser: (user) => {
        const UserModel = db.getModel('User');

        return UserModel.create(user);
    },

    removeUserById: (id) => {
        const UserModel = db.getModel('User');

        return UserModel.destroy({
            where: {
                id
            }
        });
    },

    updateUser: (user, id) => {
        const UserModel = db.getModel('User');

        return UserModel.update(user, {
            where: {
                id
            }
        });
    }
};
