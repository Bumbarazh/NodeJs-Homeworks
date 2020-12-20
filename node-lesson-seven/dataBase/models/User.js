const { USERS_TABLE_NAME, USER_MODEL_NAME } = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const User = client.define(
        USER_MODEL_NAME,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: USERS_TABLE_NAME,
            timestamps: false
        }
    );

    const Car = require('./Car')(client, DataTypes);
    const O_Auth = require('./O_Auth')(client, DataTypes);

    User.hasMany(Car, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
    });

    User.hasOne(O_Auth, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
    });

    return User;
};
