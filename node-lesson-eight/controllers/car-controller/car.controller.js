const path = require('path');
const fs = require('fs-extra').promises;
const uuid = require('uuid').v1();

const { carService } = require('../../services');
const {
    CAR_IS_CREATED,
    DELETED, CAR_DIR,
    FILES_DIR,
    PUBLIC_DIR,
    FILE_UPLOADED
} = require('../../constants/constants');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findCars();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },
    getOneCarById: (req, res, next) => {
        try {
            const { car } = req;

            res.json(car);
        } catch (e) {
            next(e);
        }
    },
    addNewCar: async (req, res, next) => {
        try {
            const createdCar = await carService.insertNewCar(req.body);

            const { photos, docs } = req;
            const pathWithoutPublic = path.join(CAR_DIR, `${createdCar.id}`, FILES_DIR);
            const fileDir = path.join(process.cwd(), PUBLIC_DIR, pathWithoutPublic);

            if (photos.length) {
                await Promise.all(photos.map(async (item) => {
                    const fileFormat = item.name.split('.').pop();
                    const photoName = `${uuid}.${fileFormat}`;
                    const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                    await fs.mkdir(fileDir, { recursive: true });
                    await item.mv(path.join(fileDir, photoName));
                    await carService.insertCarFile({ car_id: createdCar.id, doc_path: finalPhotoPath });

                    return FILE_UPLOADED;
                }));
            }

            if (docs.length) {
                await Promise.all(docs.map(async (item) => {
                    const fileFormat = item.name.split('.').pop();
                    const docName = `${uuid}.${fileFormat}`;
                    const finalPhotoPath = path.join(pathWithoutPublic, docName);

                    await fs.mkdir(fileDir, { recursive: true });
                    await item.mv(path.join(fileDir, docName));
                    await carService.insertCarFile({ car_id: createdCar.id, doc_path: finalPhotoPath });

                    return FILE_UPLOADED;
                }));
            }

            res.json(CAR_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },
    deleteCar: async (req, res, next) => {
        try {
            const { id } = req.params;
            const pathToCarFiles = path.join(process.cwd(), PUBLIC_DIR, CAR_DIR, id);

            await fs.rmdir(pathToCarFiles, { recursive: true });
            await carService.removeCarFilesById(id);
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
