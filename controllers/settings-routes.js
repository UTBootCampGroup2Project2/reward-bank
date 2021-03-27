const router = require('express').Router();
const { User, Task, Reward } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    let data = {};
  
    User.findOne({
        where: {id: req.session.user_id},
        attributes: ['id', 'name', 'admin_id']
    })
    .then(dbUserData => {
        data.user = dbUserData.toJSON();
        data.isAdmin = data.user.admin_id ? false : true;
    })
    .then(() => {
        return Task.findAll({
            where: {created_by_user_id: data.user.id, status: 'active'},
            attributes: ['id', 'name', 'value','status']
        })
    })
    .then(dbTaskData => {
        data.tasks = dbTaskData.map(task => task.get({ plain: true }));
    })
    .then(() => {
        return Reward.findAll({
            where: {created_by_user_id: data.user.id, status: 'active'},
            attributes: ['id', 'name', 'cost','status']
        })
    })
    .then(dbRewardData => {
        data.rewards = dbRewardData.map(reward => reward.get({ plain: true }));
    })
    .then(() => {
        res.render('settings', { data, loggedIn: req.session.loggedIn, isSettings: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;