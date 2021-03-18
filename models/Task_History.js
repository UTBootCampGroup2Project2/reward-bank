const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Task_History model
class Task_History extends Model {};

// create fields/columns for Task_History model
Task_History.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'task',
        key: 'id'
      }
    },
    completed_by_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'task_history'
  }
);

module.exports = Task_History;