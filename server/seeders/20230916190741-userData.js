'use strict';
const {faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data =[];
    let amount = 10;
    while(amount--){
      data.push({
        fullName: faker.internet.userName(),
        email:faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Users',data,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
