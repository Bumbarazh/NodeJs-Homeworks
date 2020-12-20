const { carService } = require('../../services');
const { CAR_IS_CREATED, DELETED } = require('../../constants/constants');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findCars();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },
    addNewCar: async (req, res, next) => {
        try {
            await carService.insertNewCar(req.body);

            res.json(CAR_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },
    deleteCar: async (req, res, next) => {
        try {
            const { id } = req.params;

            await carService.removeCarById(id);

            res.json(DELETED);
        } catch (e) {
            next(e);
        }
    },
    updateCarById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { model } = req.body;

            await carService.updateCar(model, id);
        } catch (e) {
            next(e);
        }
    }
};
