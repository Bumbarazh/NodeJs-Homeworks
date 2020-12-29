const cron = require('node-cron');

const removeOldTokens = require('./removeOldRefreshTokens');

module.exports = () => {
    cron.schedule('0 6 * * *', async () => {
        await removeOldTokens();
    });
};
