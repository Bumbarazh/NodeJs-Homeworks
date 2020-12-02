const fs = require('fs');
// eslint-disable-next-line prefer-const
let {
    isUserRegistered, isUserLogin, isUserEmailInFile, isEmailInFile
} = require('../variables/lets');

const { pathToUsersJsonFile } = require('../variables/constants');

module.exports = {
    getLoginPage: (req, res) => {
        try {
            if (isUserRegistered) {
                res.redirect('/users');
                return;
            }

            // eslint-disable-next-line no-unused-vars
            isUserLogin = false;
            // eslint-disable-next-line no-unused-vars
            isUserEmailInFile = false;

            res.render('auth');
        } catch (e) {
            res.json(e.message('Error with login page'));
        }
    },

    loginUser: (req, res) => {
        const { email, pass } = req.body;

        fs.readFile(pathToUsersJsonFile, (err, data) => {
            if (err) {
                throw err;
            }

            const users = JSON.parse(data);

            if (users.find((user) => user.email === email && user.pass === pass)) {
                isUserRegistered = !isUserRegistered;
                return res.redirect('/users');
            }

            isEmailInFile = !isEmailInFile;
            res.redirect('/error');
        });
    }

};
