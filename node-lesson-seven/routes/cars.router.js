const { Router } = require('express');

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

const carsRouter = Router();

carsRouter.get('/', carController.getAllCars);
carsRouter.get('/:id', carMiddleware.checkAccessTokenAndParams, carController.getOneCarById);
carsRouter.post('/', carMiddleware.isCarBodyComplete, carController.addNewCar);
carsRouter.delete('/:id', carMiddleware.checkAccessTokenAndParams, carController.deleteCar);
carsRouter.put('/:id', carMiddleware.checkParamsToUpdate, carController.updateCarById);

module.exports = carsRouter;
