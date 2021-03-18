const { Task } = require('../models');

const TaskData = [
  {
    name: "do dishes",
    value: 5,
    created_by_user_id: 1,
    status: 'active',
    expiration_date: null
  },
  {
    name: "make bed",
    value: 5,
    created_by_user_id: 1,
    status: 'active',
    expiration_date: null
  },
  {
    name: "sleep before 10pm",
    value: 500,
    created_by_user_id: 1,
    status: 'active',
    expiration_date: null
  },
  {
    name: "eat all vegetable",
    value: 9999,
    created_by_user_id: 1,
    status: 'active',
    expiration_date: null
  }
];

const seedTasks = () => Task.bulkCreate(TaskData);

module.exports = seedTasks;
