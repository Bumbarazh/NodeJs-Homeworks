const { authService } = require('../services');

module.exports = async () => {
    const oldTokens = await authService.removeOldRefreshTokensAndGetCount();

    console.log(`You have removed ${oldTokens} tokens.`);
};
