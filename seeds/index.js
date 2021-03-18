const seedUsers = require('./user-seeds');
const seedTasks = require('./task-seeds');
const seedTaskHistory = require('./task-history-seeds');
const seedRewards = require('./reward-seeds');
const seedRewardHistory = require('./reward-history-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  await seedTasks();
  console.log('\n----- TASKS SEEDED -----\n');
  await seedTaskHistory();
  console.log('\n----- TASK HISTORY SEEDED -----\n');
  await seedRewards();
  console.log('\n----- REWARD SEEDED -----\n');
  await seedRewardHistory();
  console.log('\n----- REWARD HISTORY SEEDED -----\n');

  process.exit(0);
};

seedAll();
