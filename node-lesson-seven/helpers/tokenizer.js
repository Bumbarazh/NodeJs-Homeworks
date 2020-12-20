const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../configs/config');

module.exports = () => {
    const access_token = jwt.sign({}, ACCESS_TOKEN, { expiresIn: '20m' });
    const refresh_token = jwt.sign({}, REFRESH_TOKEN, { expiresIn: '7d' });

    return {
        access_token,
        refresh_token
    };
};
