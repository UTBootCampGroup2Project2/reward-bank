const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Task_History } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    // console.log('======================');
    // console.log(req.session);
    let user;
    let children;

   User.findOne({
       where: {id: req.session.user_id},
       attributes: [
        'name'
       ]
   })
   .then(dbUserData => {
        user = dbUserData.toJSON();
        console.log(user);
   })
   .then(() => {
        return User.findAll({
            where: {admin_id: req.session.user_id},
            attributes: [
                'name',
                'balance'
            ]
        })
   })
   .then(dbUserData => {
        children = dbUserData.map(user => user.get({ plain: true }));
        console.log(children);
    })
   .then(() => {
        res.render('dashboard', { user, children, loggedIn: req.session.loggedIn});
   })
   .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

    
});

router.get('/edit/:id', withAuth, (req, res) => {
  
});

module.exports = router;