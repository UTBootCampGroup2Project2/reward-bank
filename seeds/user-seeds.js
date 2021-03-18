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
  },
  {
    name: "admin2name",
    username: "admin2",
    password: "password",
    role: "teacher",
    balance: null,
    admin_id: null
  },
  {
    name: "student1name",
    username: "student1",
    password: "password",
    role: "student",
    balance: 1,
    admin_id: 4
  },
  {
    name: "student2name",
    username: "student2",
    password: "password",
    role: "student",
    balance: 9000,
    admin_id: 4
  },
  {
    name: "admin3name",
    username: "admin3",
    password: "password",
    role: "teacher",
    balance: null,
    admin_id: null
  }
];

const  seedUsers = () => User.bulkCreate(UserData, {individualHooks: true});

module.exports = seedUsers;