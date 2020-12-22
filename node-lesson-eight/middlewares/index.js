module.exports = {
    userMiddlewares: require('./user/checkUsersValidity.middleware'),
    authMiddlewares: require('./auth/auth.middlewares'),
    carMiddleware: require('./car/cars.middlewares'),
    fileMiddleware: require('./file/check-file.middleware')
};
