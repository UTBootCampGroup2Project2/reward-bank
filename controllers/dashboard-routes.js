const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    res.render('dashboard', {
        loggedIn: req.session.loggedIn
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
  
});

module.exports = router;