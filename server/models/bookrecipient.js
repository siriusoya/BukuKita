'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookRecipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookRecipient.belongsTo(models.User, {
        foreignKey: 'RecipientId'
      })
      BookRecipient.belongsTo(models.Book, {
        foreignKey: 'BookId'
      })
    }
  }
  BookRecipient.init({
    RecipientId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'BookRecipient',
  });



  return BookRecipient;
};