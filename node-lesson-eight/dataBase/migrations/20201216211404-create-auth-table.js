const {
    OAUTH_TABLE_NAME, USERS_TABLE_NAME, CASCADE, ID
} = require('../../constants/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(OAUTH_TABLE_NAME, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            access_token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            refresh_token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false,
                onDelete: CASCADE,
                onUpdate: CASCADE,
                references: {
                    model: USERS_TABLE_NAME,
                    key: ID
                }
            },
            created_At: {
                type: Sequelize.DataTypes.DATE,
                default: Sequelize.NOW
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(OAUTH_TABLE_NAME);
    }
};
