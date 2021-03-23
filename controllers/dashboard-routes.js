const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Task, Task_History, Reward, Reward_History } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    // console.log('======================');
    // console.log(req.session);
    let data = {};
    let user;
    let children;
    let task_history;

   User.findOne({
       where: {id: req.session.user_id},
       attributes: [
        'name'
       ]
   })
   .then(dbUserData => {
        data.user = dbUserData.toJSON();
        // console.log(user);
   })
   .then(() => {
        return User.findAll({
            where: {admin_id: req.session.user_id},
            attributes: [
                'id',
                'name',
                'balance'
            ]
        })
   })
   .then(dbUserData => {
        data.children = dbUserData.map(user => user.get({ plain: true }));
        // console.log(children);
    })
    .then(() => {
        const children_id_list = data.children.map(child => child.id);
        return Task_History.findAll({
            where: {completed_by_user_id: children_id_list, status: 'pending'},
            attributes: [
                'completed_by_user_id',
                'task_id'
            ],
            include: [{
                model: User,
                attributes: ['name']
            },{
                model: Task,
                attributes: ['name']
            }]
        })
   })
   .then(dbTaskHistoryData => {
        data.task_history = dbTaskHistoryData.map(task_history => task_history.get({ plain: true }));
        // console.log("data.task_history");
        // console.log(data.task_history);
    })
    .then(() => {
        const children_id_list = data.children.map(child => child.id);
        return Reward_History.findAll({
            where: {purchased_by_user_id: children_id_list},
            attributes: [
                'reward_id'
            ],
            include: [{
                model: User,
                attributes: ['name']
            },{
                model: Reward,
                attributes: ['name']
            }]
        })
   })
   .then(dbRewardHistoryData => {
        data.reward_history = dbRewardHistoryData.map(reward_history => reward_history.get({ plain: true }));
        console.log("data.reward_history");
        console.log(data.reward_history);
    })
   .then(() => {
        console.log(data);
        res.render('dashboard', { data, loggedIn: req.session.loggedIn});
   })
   .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

    
});

router.get('/edit/:id', withAuth, (req, res) => {
  
});

module.exports = router;