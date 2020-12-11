const {
    BAD_REQUEST, FORBIDDEN, CREATED, NO_CONTENT, UNAUTHORIZED, NOT_FOUND
} = require('../configs/error-codes');

module.exports = {
    NOT_VALID_ID: {
        message: 'User ID is not valid',
        code: BAD_REQUEST
    },

    USER_ALREADY_REGISTERED: {
        message: 'User is already registered',
        code: FORBIDDEN
    },

    USER_CREATED: {
        message: 'User is successfully created',
        code: CREATED
    },

    BODY_IS_NOT_COMPLETE: {
        message: 'All fields in form are required',
        CODE: NO_CONTENT
    },

    NOT_LOGGED_IN: {
        message: 'User is not logged in',
        code: UNAUTHORIZED
    },

    USER_IS_NOT_FOUND: {
        message: 'User with this ID is not found',
        code: NOT_FOUND
    }
};
