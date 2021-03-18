const router = require('express').Router();
const { User} = require("../../models");
const withAuth = require('../../utils/auth');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })

});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'Sorry! No user was found with this id.'})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
  
});



//GET all children of a parent
router.get('/child/:id', (req, res) => {
  
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