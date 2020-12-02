const { isUserRegistered } = require('../variables/lets');

module.exports = {
    checkIfUserIsLoggedIn: (req, res, next) => {
        try {
            if (isUserRegistered) {
                res.redirect('/users');
            }

            next();
        } catch (e) {
            res.json(e.message('Problem with login page rendering'));
        }
    }
};
