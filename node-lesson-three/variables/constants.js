const path = require('path');

module.exports = {
    messageToLogin: 'This email is already register on our site. Please, ',
    messageToRegister: 'Your email or password aren\'t valid. Please, try to log in again or ',
    messageToLogOrReg: 'To see yor account, you must to ',
    pathToUsersJsonFile: path.join(process.cwd(), 'views', 'registered-users.json')
};
