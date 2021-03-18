const { Task_History } = require('../models');

const Task_HistoryData = [
  {
    task_id: 0,
    completed_by_user_id: 1,
    status: 'pending'
  },
  {
    task_id: 0,
    completed_by_user_id: 1,
    status: 'completed'
  },
  {
    task_id: 1,
    completed_by_user_id: 2,
    status: 'completed'
  }
];

const seedTaskHistory = () => Task_History.bulkCreate(Task_HistoryData);

module.exports = seedTaskHistory;
