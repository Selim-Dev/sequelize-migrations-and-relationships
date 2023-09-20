'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Posts',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        // cascase means : if parent is deleted all it's children will be deleted
        // set null : if parent is deleted all it's children will be set to null
      }
    )
  },

  async down (queryInterface, Sequelize) {
    
  }
};
