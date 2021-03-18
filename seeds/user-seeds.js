const { User } = require('../models');

// const UserData = [
//   {
//     name: "admin1name",
//     username: "admin1",
//     password: "password",
//     role: "parent",
//     balance: null,
//     admin: null
//   },
//   {
//     name: "child1name",
//     username: "child1",
//     password: "password",
//     role: "child",
//     balance: 0,
//     admin: 0
//   },
//   {
//     name: "child2name",
//     username: "child2",
//     password: "password",
//     role: "child",
//     balance: 50,
//     admin: 0
//   },
//   {
//     name: "admin2name",
//     username: "admin2",
//     password: "password",
//     role: "teacher",
//     balance: null,
//     admin: null
//   },
//   {
//     name: "student1name",
//     username: "student1",
//     password: "password",
//     role: "student",
//     balance: 1,
//     admin: 3
//   },
//   {
//     name: "student2name",
//     username: "student2",
//     password: "password",
//     role: "teacher",
//     balance: 9000,
//     admin: 3
//   },
//   {
//     name: "admin3name",
//     username: "admin3",
//     password: "password",
//     role: "teacher",
//     balance: null,
//     admin: null
//   }
// ];

const seedUsers = () => User.bulkCreate([
  {
    name: "admin1name",
    username: "admin1",
    password: "password",
    role: "parent",
    balance: null,
    admin: null
  },
  {
    name: "child1name",
    username: "child1",
    password: "password",
    role: "child",
    balance: 0,
    admin: 0
  },
  {
    name: "child2name",
    username: "child2",
    password: "password",
    role: "child",
    balance: 50,
    admin: 0
  },
  {
    name: "admin2name",
    username: "admin2",
    password: "password",
    role: "teacher",
    balance: null,
    admin: null
  },
  {
    name: "student1name",
    username: "student1",
    password: "password",
    role: "student",
    balance: 1,
    admin: 3
  },
  {
    name: "student2name",
    username: "student2",
    password: "password",
    role: "teacher",
    balance: 9000,
    admin: 3
  },
  {
    name: "admin3name",
    username: "admin3",
    password: "password",
    role: "teacher",
    balance: null,
    admin: null
  }
]);

module.exports = seedUsers;
