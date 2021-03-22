const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {
      loggedIn: req.session.loggedIn
      });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }
    
      res.render('login');
});

router.get('/settings', (req, res) => {
  res.render('settings', {
    loggedIn: req.session.loggedIn
    });
});

router.get('/post/:id', (req, res) => {
  
});

module.exports = router;