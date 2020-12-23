const { DOCUMENT_MODEL_NAME, DOCUMENT_TABLE_NAME } = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const Doc = client.define(
        DOCUMENT_MODEL_NAME,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            doc_path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            car_id: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false
            }
        },
        {
            tableName: DOCUMENT_TABLE_NAME,
            timestamps: false
        }
    );

    return Doc;
};
