const { User } = require('../models');

const PostData = [
  {
    username: "Sufyan",
    password: "password"
  },
  {
    username: 'Swanson',
    password: "password"
  },
  {
    username: 'Ayah',
    password: "password"
  },
  {
    username: 'Archer',
    password: "password"
  },
  {
    username: 'Stan',
    password: "password"
  },
  {
    username: 'Echo',
    password: "password"
  }
];

const seedUsers = () => User.bulkCreate(PostData);

module.exports = seedUsers;
