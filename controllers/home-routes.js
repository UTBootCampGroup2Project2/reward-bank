const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {
      });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }
    
      res.render('login');
});

router.get('/signup', (req, res) => {
  
});

router.get('/post/:id', (req, res) => {
  
});

module.exports = router;