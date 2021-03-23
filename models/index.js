const User = require("./User");
const Task = require("./Task");
const Task_History = require("./Task_History");
const Reward = require("./Reward");
const Reward_History = require("./Reward_History");
// create associations

User.hasOne(User, {
  foreignKey: 'admin_id'
});

User.hasMany(User, {
  foreignKey: 'admin_id'
});

Task.belongsTo(User, {
  foreignKey: 'created_by_user_id'
});

Task_History.belongsTo(Task, {
  foreignKey: 'task_id'
});

Task_History.belongsTo(User, {
  foreignKey: 'completed_by_user_id'
});

Reward.belongsTo(User, {
  foreignKey: 'created_by_user_id'
});

Reward_History.belongsTo(Reward, {
  foreignKey: 'reward_id'
});

Reward_History.belongsTo(Reward, {
  foreignKey: 'purchased_by_user_id'
});

module.exports = { User, Task, Task_History, Reward, Reward_History };