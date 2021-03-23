const { User } = require('../models');

const UserData = [
  {
    name: "admin1name",
    username: "admin1",
    password: "password",
    role: "parent",
    balance: null,
    admin_id: null
  },
  {
    name: "child1name",
    username: "child1",
    password: "password",
    role: "child",
    balance: 0,
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