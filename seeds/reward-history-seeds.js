const { Reward_History } = require('../models');

const Reward_HistoryData = [
  {
    reward_id: 0,
    purchased_by_user_id: 1
  },
  {
    reward_id: 0,
    purchased_by_user_id: 2
  },
  {
    reward_id: 1,
    purchased_by_user_id: 2
  }
];

const seedReward_History = () => Reward_History.bulkCreate(Reward_HistoryData);

module.exports = seedReward_History;
