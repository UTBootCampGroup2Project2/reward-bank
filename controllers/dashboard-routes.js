const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Task, Task_History, Reward, Reward_History } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    let data = {};

   User.findOne({
       where: {id: req.session.user_id},
       attributes: ['admin_id']
   })
   .then(dbUserData => {
        data.isAdmin = dbUserData.toJSON().admin_id ? false : true;
        if(data.isAdmin){
            return parentData(req, res)
            .then(result => {
                data = Object.assign(data, result);
                return data;
            });
        }
        else{
            return childData(req, res)
            .then(result => {
                data = Object.assign(data, result);
                return data;
                // console.log(data);
            });
        }
   })
   .then(() => {
        // console.log(data);
        res.render('dashboard', { data, loggedIn: req.session.loggedIn, isDashboard: true});
   })
   .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

var parentData = function(req, res) {
    let data = {};
    return User.findOne({
        where: {id: req.session.user_id},
        attributes: ['name', 'admin_id']
    })
    .then(dbData => {
        data.user = dbData.toJSON();
    })
    .then(() => {
        return User.findAll({
            where: {admin_id: req.session.user_id},
            attributes: ['id', 'name', 'balance']
        })
        .then(dbData => {
            data.children = dbData.map(entry => entry.get({ plain: true }));
        });
    })
    .then(() => {
        const children_id_list = data.children.map(child => child.id);

        return Task_History.findAll({
            where: {completed_by_user_id: children_id_list, status: 'pending'},
            attributes: ['id', 'completed_by_user_id', 'task_id', 'updated_at'],
            include: [{model: User, attributes: ['name']}, {model: Task, attributes: ['name', 'value']}]
        })
        .then(dbData => {
            data.task_history = dbData.map(entry => entry.get({ plain: true }));
            // console.log(data.task_history);
        });
    })
    .then(() => {
        const children_id_list = data.children.map(child => child.id);

        return Reward_History.findAll({
            where: {purchased_by_user_id: children_id_list},
            attributes: ['id', 'reward_id', 'updated_at'],
            include: [{model: User, attributes: ['name']}, {model: Reward, attributes: ['name']}]
        })
        .then(dbData => {
            data.reward_history = dbData.map(entry => entry.get({ plain: true }));
        });
    })
    .then(() => {
        return data;
    })
    .catch(err => {
        console.log(err);
        if(res){res.status(500).json(err);}
    });
};

var childData = function(req, res) {
    let data = {};
    return User.findOne({
        where: {id: req.session.user_id},
        attributes: ['id', 'name', 'balance', 'admin_id']
    })
    .then(dbData => {
        data.user = dbData.toJSON();
    })
    .then(() => {
        // console.log(data.user.admin_id);
        return Task.findAll({
            where: {created_by_user_id: data.user.admin_id, status: 'active'},
            attributes: ['id', 'name', 'value']
        })
        .then(dbData => {
            data.tasks = dbData.map(entry => entry.get({ plain: true }));
            // console.log(data.task_history);
        });
    })
    .then(() => {
        // console.log(data.user.admin_id);
        return Task_History.findAll({
            where: {completed_by_user_id: req.session.user_id, status: 'pending'},
            attributes: ['id', 'updated_at'],
            include: [{model: Task, attributes: ['name', 'value']}]
        })
        .then(dbData => {
            data.task_history = {};
            data.task_history.pending = dbData.map(entry => entry.get({ plain: true }));
            // console.log(data.task_history);
        });
    })
    .then(() => {
        // console.log(data.user.admin_id);
        return Task_History.findAll({
            where: {completed_by_user_id: req.session.user_id, status: 'completed'},
            attributes: ['id', 'updated_at'],
            include: [{model: Task, attributes: ['name', 'value']}]
        })
        .then(dbData => {
            data.task_history.completed = dbData.map(entry => entry.get({ plain: true }));
            // console.log(data.task_history);
        });
    })
    .then(() => {
        // console.log(data.user.admin_id);
        return Reward.findAll({
            where: {created_by_user_id: data.user.admin_id, status: 'active'},
            attributes: ['id', 'name', 'cost']
        })
        .then(dbData => {
            data.rewards = dbData.map(entry => entry.get({ plain: true }));
            // console.log(data.task_history);
        });
    })
    .then(() => {
        // console.log(data.user.admin_id);
        return Reward_History.findAll({
            where: {purchased_by_user_id: req.session.user_id},
            attributes: ['id', 'updated_at'],
            include: [{model: Reward, attributes: ['name', 'cost']}]
        })
        .then(dbData => {
            data.reward_history = dbData.map(entry => entry.get({ plain: true }));
            // console.log(data.reward_history);
        });
    })
    .then(() => {
        return data;
    })
    .catch(err => {
        console.log(err);
        if(res){res.status(500).json(err);}
    });
}

module.exports = router;