const { Reward } = require('../models');

const RewardData = [
  {
    name: "TV - 30min",
    cost: 20,
    created_by_user_id: 1,
    status: 'active'
  },
  {
    name: "one fortnite skin",
    cost: 501,
    created_by_user_id: 1,
    status: 'active'
  },
  {
    name: "iPad - 30min",
    cost: 20,
    created_by_user_id: 1,
    status: 'inactive'
  }
];

const seedRewards = () => Reward.bulkCreate(RewardData);

module.exports = seedRewards;