const seedAdminUsers = require('./user-seeds-admin');
const seedUsers = require('./user-seeds');
const seedTasks = require('./task-seeds');
const seedTaskHistory = require('./task-history-seeds');
const seedRewards = require('./reward-seeds');
const seedRewardHistory = require('./reward-history-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true }).then(() => console.log('\n----- DATABASE SYNCED -----\n'));

  await seedAdminUsers()
  .then(() => console.log('\n----- ADMIN USERS SEEDED -----\n'));
  await seedUsers()
  .then(() => console.log('\n----- USERS SEEDED -----\n'));
  await seedTasks()
  .then(() => console.log('\n----- TASKS SEEDED -----\n'));
  await seedTaskHistory()
  .then(() => console.log('\n----- TASK HISTORY SEEDED -----\n'));
  await seedRewards()
  .then(() => console.log('\n----- REWARDS SEEDED -----\n'));
  await seedRewardHistory()
  .then(() => console.log('\n----- REWARD HISTORY SEEDED -----\n'));

  process.exit(0);
};

seedAll();
