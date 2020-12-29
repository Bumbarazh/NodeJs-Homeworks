const { OAUTH_MODEL_NAME, OAUTH_TABLE_NAME } = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const O_Auth = client.define(
        OAUTH_MODEL_NAME,
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: OAUTH_TABLE_NAME,
            timestamps: false
        }
    );

    return O_Auth;
};
