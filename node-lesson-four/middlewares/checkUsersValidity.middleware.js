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

    checkUserIdValidity: (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                throw new Error('Id is not exists');
            }

            if (id <= 0) {
                throw new Error('Id is not valid');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkUserBodyAndId: (req, res, next) => {
        try {
            const { id } = req.params;

            const userAttr = req.body;

            if (!id && id <= 0) {
                throw new Error('Id is not valid');
            }

            if (!userAttr) {
                throw new Error('User attributes are not exists');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
