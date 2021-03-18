const { Reward_History } = require('../models');

const Reward_HistoryData = [
  {
    reward_id: 1,
    purchased_by_user_id: 2
  },
  {
    reward_id: 1,
    purchased_by_user_id: 3
  },
  {
    reward_id: 2,
    purchased_by_user_id: 3
  }
];

const seedReward_History = () => Reward_History.bulkCreate(Reward_HistoryData);

module.exports = seedReward_History;
