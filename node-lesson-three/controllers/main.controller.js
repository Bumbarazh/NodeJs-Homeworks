let { isEmailInFile, isUserEmailInFile, isUserLogin } = require('../variables/lets');

module.exports = {
    getMainPage: (req, res) => {
        try {
            // eslint-disable-next-line no-unused-vars
            isEmailInFile = false;
            // eslint-disable-next-line no-unused-vars
            isUserEmailInFile = false;
            // eslint-disable-next-line no-unused-vars
            isUserLogin = false;

            res.render('main');
        } catch (e) {
            res.json(e.message('Main page is not working'));
        }
    }
};
