const { User } = require('../models');

const UserData = [
  {
    name: "child1name",
    username: "child1",
    password: "password",
    role: "child",
    balance: 10,
    admin_id: 1
  },
  {
    name: "child2name",
    username: "child2",
    password: "password",
    role: "child",
    balance: 50,
    admin_id: 1
  }
];

const  seedUsers = () => User.bulkCreate(UserData, {individualHooks: true});

module.exports = seedUsers;