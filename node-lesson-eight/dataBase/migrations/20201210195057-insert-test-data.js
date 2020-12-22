const { USERS_TABLE_NAME, CARS_TABLE_NAME } = require('../../constants/constants');

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(USERS_TABLE_NAME, [
            {
                id: 1,
                nickname: 'Lolik',
                email: 'lol@i.ua',
                password: '12345',
                age: 25
            },
            {
                id: 2,
                nickname: 'Bolik',
                email: 'bob@i.ua',
                password: '54321',
                age: 36
            },
            {
                id: 3,
                nickname: 'Harry',
                email: 'harry@gmail.ua',
                password: '333666',
                age: 12
            },
            {
                id: 4,
                nickname: 'Okten',
                email: 'ok10@i.ua',
                password: '8080',
                age: 33
            }
        ]);

        await queryInterface.bulkInsert(CARS_TABLE_NAME, [
            {
                id: 1,
                model: 'BMW M3',
                user_id: 1
            },
            {
                id: 2,
                model: 'VW Passat',
                user_id: 2
            },
            {
                id: 3,
                model: 'Nissan',
                user_id: 3
            },
            {
                id: 4,
                model: 'Toyota',
                user_id: 4
            }
        ]);
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(CARS_TABLE_NAME, null);

        await queryInterface.bulkDelete(USERS_TABLE_NAME, null);
    }
};
