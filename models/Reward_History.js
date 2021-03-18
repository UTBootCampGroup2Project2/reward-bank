const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reward_History extends Model {};

// create fields/columns for Reward_History model
Reward_History.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reward_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reward',
        key: 'id'
      }
    },
    purchased_by_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'reward_history'
  }
);

module.exports = Reward_History;