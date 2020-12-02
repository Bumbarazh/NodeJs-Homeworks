const { Router } = require('express');
const { getMainPage } = require('../controllers/main.controller');

const mainRoute = Router();

mainRoute.get('/', getMainPage);

module.exports = mainRoute;
