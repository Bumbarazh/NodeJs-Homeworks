const {
    DOCUMENT_TABLE_NAME, CARS_TABLE_NAME, CASCADE, ID
} = require('../../constants/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(DOCUMENT_TABLE_NAME, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            doc_path: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            car_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                onDelete: CASCADE,
                onUpdate: CASCADE,
                references: {
                    model: CARS_TABLE_NAME,
                    key: ID
                }
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(DOCUMENT_TABLE_NAME);
    }
};
