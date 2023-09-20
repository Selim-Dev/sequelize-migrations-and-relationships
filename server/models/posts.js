'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users,{
        foreignKey: 'userId',
        as: 'user'
      })
      this.belongsToMany(models.Tags,{
        through: 'postTags',
        foreignKey: 'postId',
        as: 'tags'
      })
    }
  }
  Posts.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};