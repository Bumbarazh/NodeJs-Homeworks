const { Router } = require('express');
const { getLoginPage, loginUser } = require('../controllers/login.controller');

const loginRoute = Router();

loginRoute.get('/', getLoginPage);

loginRoute.post('/', loginUser);

module.exports = loginRoute;
