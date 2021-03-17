const router = require('express').Router();
const { User, Post} = require("../../models");
const withAuth = require('../../utils/auth');

// GET /api/users
router.get('/', (req, res) => {

});

// GET /api/users/1
router.get('/:id', (req, res) => {
  
});

// POST /api/users
router.post('/', (req, res) => {
  
});

router.post('/login', (req, res) => {
  
});

router.post('/logout', (req, res) => {
  
});

// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
  
});

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
  
});

module.exports = router;