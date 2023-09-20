'use strict';
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
      this.hasMany(models.Posts,{
        foreignKey: 'userId',
        as: 'posts'
      })
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    googleId: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return User;
};