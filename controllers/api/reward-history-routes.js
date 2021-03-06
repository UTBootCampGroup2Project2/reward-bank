const router = require('express').Router();
const { Reward_History, Reward } = require("../../models");
const withAuth = require('../../utils/auth');

//Get all reward history for a child 
router.get('/:childID', (req, res) => {
    Reward_History.findAll({
        attributes: ['id', 'reward_id', 'purchased_by_user_id'],
        order: [['created_at', 'DESC']],
        where: {
            purchased_by_user_id: req.params.childID
        },
        include: [
            {
                model: Reward,
                attributes: ['name', 'cost']
            }
        ]

    })
    .then(dbRewardHistoryData => {
        if (!dbRewardHistoryData) {
            res.status(404).json({ message: 'Sorry! No task history was found for this user.'});
            return;
        }
        res.json(dbRewardHistoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  
})


//add new reward history
router.post('/', withAuth, (req, res) => {
    Reward_History.create({
        reward_id: req.body.reward_id,
        purchased_by_user_id: req.session.user_id
    })
    .then(dbRewardHistoryData => res.json(dbRewardHistoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//change reward history status to complete
router.put('/:rewardHistoryId', withAuth, (req, res) => {
    Reward_History.update({
        id: req.params.rewardHistoryId,
        reward_id: req.body.reward_id,
        purchased_by_user_id: req.body.purchased_by_user_id,
        status: req.body.status
    },
    {
        where: {
            id: req.params.rewardHistoryId
        }
    }
    )
    .then(dbRewardHistoryData => res.json(dbRewardHistoryData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
})

//delete task history
router.delete('/:id', withAuth, (req, res) => {
    Reward_History.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbRewardHistoryData => {
        if (!dbRewardHistoryData) {
            res.status(404).json({ message: 'Sorry! No task history was found with this id.'});
            return;
        }
        res.json(dbRewardHistoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });

  module.exports = router;