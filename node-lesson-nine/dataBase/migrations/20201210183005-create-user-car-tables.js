const {
    CARS_TABLE_NAME, USERS_TABLE_NAME, ID, CASCADE
} = require('../../constants/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(USERS_TABLE_NAME, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nickname: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: Sequelize.DataTypes.STRING
            },
            age: {
                type: Sequelize.DataTypes.INTEGER,
            }
        });

        await queryInterface.createTable(CARS_TABLE_NAME, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            model: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                onDelete: CASCADE,
                onUpdate: CASCADE,
                references: {
                    model: USERS_TABLE_NAME,
                    key: ID
                }
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(CARS_TABLE_NAME);

        await queryInterface.dropTable(USERS_TABLE_NAME);
    }
};
