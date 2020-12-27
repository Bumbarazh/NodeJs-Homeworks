const db = require('../../dataBase').getInstance();
const { CAR_MODEL_NAME, DOCUMENT_MODEL_NAME } = require('../../constants/constants');

module.exports = {
    findCars: () => {
        const carModel = db.getModel(CAR_MODEL_NAME);

        return carModel.findAll();
    },
    insertNewCar: (newCar) => {
        const CarModel = db.getModel(CAR_MODEL_NAME);

        return CarModel.create(newCar);
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
    },
    insertCarFile: (file, transaction) => {
        const DocModel = db.getModel(DOCUMENT_MODEL_NAME);

        return DocModel.create(file, { transaction });
    },
    removeCarFilesById: (id) => {
        const DocModel = db.getModel(DOCUMENT_MODEL_NAME);

        return DocModel.destroy({
            where: {
                car_id: id
            }
        });
    }
};
