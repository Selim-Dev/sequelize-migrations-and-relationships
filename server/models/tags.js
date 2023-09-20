'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Posts,{
        through: 'postTags',
        foreignKey: 'tagId',
        as: 'posts'
      })
    }
  }
  Tags.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tags',
  });
  return Tags;
};