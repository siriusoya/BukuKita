'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookRecipients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RecipientId: {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Users',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      BookId: {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Books',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      message: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BookRecipients');
  }
};