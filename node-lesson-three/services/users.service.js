let users = require('../dataBase/usersDataBase');

module.exports = {
    findAllUsers: () => users,

    insertUser: (user) => users.push(user),

    findUserByEmail: (email) => users.find((user) => user.email === email),

    removeUserByEmail: (email) => {
        users = users.filter((user) => user.email !== email);
        return users;
    }
};
