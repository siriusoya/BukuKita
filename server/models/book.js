'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.User, {
        foreignKey: 'OwnerId'
      })
      Book.hasMany(models.BookRecipient, {
        foreignKey: 'BookId'
      });
    }
  }
  Book.init({
    OwnerId: DataTypes.INTEGER,
    BookRecipientId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Title is required!'},
        notEmpty: {msg: 'Title is required!'}
    }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Author is required!'},
        notEmpty: {msg: 'Author is required!'}
    }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'ISBN is required!'},
        notEmpty: {msg: 'ISBN is required!'}
    }
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Title is required!'},
        notEmpty: {msg: 'Title is required!'}
    }
    },
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};