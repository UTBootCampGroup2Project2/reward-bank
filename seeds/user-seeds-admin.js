const { User } = require('../models');

const UserData = [
  {
    name: "admin1name",
    username: "admin1",
    password: "password",
    role: "parent",
    balance: null,
    admin_id: null
  }
];

const  seedAdminUsers = () => User.bulkCreate(UserData, {individualHooks: true});

module.exports = seedAdminUsers;