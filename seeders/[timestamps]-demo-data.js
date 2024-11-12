// seeders/[timestamp]-demo-data.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Admins', [{
      username: 'admin1',
      password: 'hashedpassword',
      email: 'admin1@example.com',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
