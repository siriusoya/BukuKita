'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OwnerId: {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Users',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      BookRecipientId: {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Users',
          key: 'id'
        },
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Available'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false
      },
      condition: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imgUrl: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Books');
  }
};