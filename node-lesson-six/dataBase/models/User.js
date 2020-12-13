module.exports = (client, DataTypes) => {
    const User = client.define(
        'User',
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
            tableName: 'users',
            timestamps: false
        }
    );

    const Car = require('./Car')(client, DataTypes);

    User.hasOne(Car, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
    });

    return User;
};
