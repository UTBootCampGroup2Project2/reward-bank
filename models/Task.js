const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Task model
class Task extends Model {};

// create fields/columns for Task model
Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    created_by_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active'
    },
    expiration_date: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'task'
  }
);

module.exports = Task;