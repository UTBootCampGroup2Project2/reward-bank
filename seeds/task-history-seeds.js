const { Task_History } = require('../models');

const Task_HistoryData = [
  {
    task_id: 1,
    completed_by_user_id: 2,
    status: 'pending'
  },
  {
    task_id: 1,
    completed_by_user_id: 2,
    status: 'completed'
  },
  {
    task_id: 2,
    completed_by_user_id: 3,
    status: 'completed'
  },
  {
    task_id: 3,
    completed_by_user_id: 3,
    status: 'pending'
  },
  {
    task_id: 4,
    completed_by_user_id: 3,
    status: 'pending'
  }
];

const seedTaskHistory = () => Task_History.bulkCreate(Task_HistoryData);

module.exports = seedTaskHistory;
