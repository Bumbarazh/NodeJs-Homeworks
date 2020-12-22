const db = require('../../dataBase').getInstance();
const { CAR_MODEL_NAME } = require('../../constants/constants');

module.exports = {
    findCars: () => {
        const carModel = db.getModel(CAR_MODEL_NAME);

        return carModel.findAll();
    },
    insertNewCar: (newCar) => {
        const CarModel = db.getModel(CAR_MODEL_NAME);

        CarModel.create(newCar);
    },
    findCarById: (id) => {
        const CarModel = db.getModel(CAR_MODEL_NAME);

        const car = CarModel.findOne({
            where: {
                id
            }
        });

        return car && car.dataValues;
    },
    removeCarById: (id) => {
        const CarModel = db.getModel(CAR_MODEL_NAME);

        CarModel.destroy({
            where: {
                id
            }
        });
    },
    updateCar: (model, id) => {
        const CarModel = db.getModel(CAR_MODEL_NAME);

        CarModel.update(model, {
            where: {
                id
            }
        });
    }
};
