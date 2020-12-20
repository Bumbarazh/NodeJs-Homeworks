const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const {
    DB_DIAL,
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_USER
} = require('../configs/config');
const { DB_MODELS, DB_PACKAGE } = require('../constants/constants');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
            host: DB_HOST,
            dialect: DB_DIAL
        });

        const models = {};
        const modelsPath = path.join(process.cwd(), DB_PACKAGE, DB_MODELS);

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, model));
                    models[model] = modelFile(client, DataTypes);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
