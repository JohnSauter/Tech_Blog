const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Response extends Model {}

Response.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING(65535),
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    topic_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'topic',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'response',
  }
);

module.exports = Project;
