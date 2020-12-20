const { Router } = require('express');

const authRouter = Router();

const { authMiddlewares } = require('../middlewares');
const { authController } = require('../controllers');

authRouter.post('/', authMiddlewares.checkAuthBodyComplete, authController.loginUser);
authRouter.post('/refresh', authMiddlewares.checkRefreshToken, authController.refreshToken);
authRouter.post('/logout', authMiddlewares.checkAccessTokenForLogout, authController.logOutUser);

module.exports = authRouter;
