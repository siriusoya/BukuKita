'use strict';

const { hashPassword } = require('../helpers/bcrypt');


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Book, {
        foreignKey: 'OwnerId'
      });
      User.hasMany(models.BookRecipient, {
        foreignKey: 'RecipientId'
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'Email has been registered!'},
      validate: {
        notNull: {msg: 'Email is required!'},
        notEmpty: {msg: 'Email is required!'},
        isEmail: {msg: 'Invalid email format!'}
    }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Password is required!'},
        notEmpty: {msg: 'Password is required!'}
    }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Name is required!'},
        notEmpty: {msg: 'Name is required!'}
    }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'City is required!'},
        notEmpty: {msg: 'City is required!'}
    }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Phone number is required!'},
        notEmpty: {msg: 'Phone number is required!'}
    }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password)
  })

  return User;
};