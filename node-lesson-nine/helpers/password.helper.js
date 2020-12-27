const bcrypt = require('bcrypt');

const { ErrorHandler, errors: { EMAIL_OR_PASS_NOT_VALID } } = require('../error');

module.exports = {
    hash: (password) => bcrypt.hash(password, 8),
    compare: async (password, hash) => {
        const isPasswordEquals = await bcrypt.compare(password, hash);

        if (!isPasswordEquals) {
            throw new ErrorHandler(EMAIL_OR_PASS_NOT_VALID.message, EMAIL_OR_PASS_NOT_VALID.code);
        }
    }
};
