const path = require('path');
const fs = require('fs-extra').promises;
const uuid = require('uuid').v1();

const { carService, logService } = require('../../services');
const {
    CAR_IS_CREATED,
    DELETED, CAR_DIR,
    FILES_DIR,
    PUBLIC_DIR,
    FILE_UPLOADED,
    CAR_UPDATED
} = require('../../constants/constants');
const { transactionInstance } = require('../../dataBase').getInstance();

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
        const transaction = transactionInstance();

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
                    await carService.insertCarFile({
                        car_id: createdCar.id,
                        doc_path: finalPhotoPath,
                    }, transaction);

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
                    await carService.insertCarFile(
                        { car_id: createdCar.id, doc_path: finalPhotoPath },
                        { transaction }
                    );

                    return FILE_UPLOADED;
                }));
            }

            await transaction.commit();
            await logService.createLogs({
                action: CAR_IS_CREATED,
                time_of_action: new Date(),
                user_id: createdCar.id
            });
            res.json(CAR_IS_CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    deleteCar: async (req, res, next) => {
        const transaction = transactionInstance();

        try {
            const { id } = req.params;
            const pathToCarFiles = path.join(process.cwd(), PUBLIC_DIR, CAR_DIR, id);

            await fs.rmdir(pathToCarFiles, { recursive: true });
            await carService.removeCarFilesById(id, { transaction });
            await carService.removeCarById(id, { transaction });

            await transaction.commit();
            await logService.createLogs({
                action: DELETED,
                time_of_action: new Date(),
                user_id: id
            });
            res.json(DELETED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    updateCarById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { model } = req.body;

            await carService.updateCar(model, id);

            await logService.createLogs({
                action: CAR_UPDATED,
                time_of_action: new Date(),
                user_id: id
            });
            next();
        } catch (e) {
            next(e);
        }
    }
};
