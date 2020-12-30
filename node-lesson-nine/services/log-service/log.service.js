const LogsModel = require('../../dataBase/mongo-models');

module.exports = {
    createLogs: (logToCreate) => new LogsModel(logToCreate).save()
};
