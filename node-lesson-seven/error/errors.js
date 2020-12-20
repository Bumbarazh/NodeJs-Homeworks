const {
    BAD_REQUEST,
    FORBIDDEN,
    CREATED,
    NO_CONTENT,
    UNAUTHORIZED,
    NOT_FOUND,
    CONFLICT
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

    NOT_FOUND: {
        message: 'Car with this ID is not found',
        code: NOT_FOUND
    },

    EMAIL_OR_PASS_NOT_VALID: {
        message: 'Email or password are not valid',
        code: BAD_REQUEST
    },

    NOT_VALID_TOKEN: {
        message: 'Not valid token',
        code: UNAUTHORIZED
    },

    CONFLICT: {
        message: 'User is already exist',
        code: CONFLICT
    },

    PERMISSION_DENIED: {
        message: 'Permission denied',
        code: FORBIDDEN
    },

    NO_CONTENT: {
        message: 'User is logout',
        code: NO_CONTENT
    }
};
