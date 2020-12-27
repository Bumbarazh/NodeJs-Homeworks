const { CARS_TABLE_NAME, CAR_MODEL_NAME } = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const Car = client.define(
        CAR_MODEL_NAME,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            }
        },
        {
            tableName: CARS_TABLE_NAME,
            timestamps: false
        }
    );

    const Doc = require('./Doc')(client, DataTypes);

    Car.hasMany(Doc, {
        foreignKey: 'car_id',
        onDelete: 'cascade'
    });

    return Car;
};
