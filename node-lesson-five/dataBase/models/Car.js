module.exports = (client, DataTypes) => {
    const Car = client.define(
        'Car',
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
            tableName: 'cars',
            timestamps: false
        }
    );

    return Car;
};
