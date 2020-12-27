require('dotenv').config();

const {
    DB_DIAL,
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_USER
} = require('./config');

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        dialect: DB_DIAL
    }
};
