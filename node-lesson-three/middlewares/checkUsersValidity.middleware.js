module.exports = {
    isUserAlreadyRegistered: (req, res, next) => {
        try {
            const { email, nickname, password } = req.body;

            if (!email || !nickname || !password) {
                throw new Error('All fields in form are required');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkUserEmailValidity: (req, res, next) => {
        try {
            const { email } = req.params;

            if (!email) {
                throw new Error('Email is not valid');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
