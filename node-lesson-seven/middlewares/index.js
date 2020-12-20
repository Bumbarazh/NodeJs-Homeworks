module.exports = {
    userMiddlewares: require('./user/checkUsersValidity.middleware'),
    authMiddlewares: require('./auth/auth.middlewares'),
    carMiddleware: require('./cars/cars.middlewares')
};
