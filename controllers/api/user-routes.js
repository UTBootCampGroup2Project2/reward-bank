const router = require('express').Router();
const { User} = require("../../models");
const withAuth = require('../../utils/auth');

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })

});

// GET one user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
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
        // console.log(dbUserData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
  
});



//GET all children of a parent
router.get('/child/:parentId', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']},
        where: {
            admin_id: req.params.parentId
        }
    })
    .then(dbChildData => {
        if (!dbChildData) {
            res.status(404).json({ message: 'Sorry! No children were associated with this parent/teacher.'})
            return
        }
        res.json(dbChildData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    }) 
});


// CREATE New Admin User (Parent/Teacher)
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
  
});

//CREATE New Child User
router.post('/child/', (req,res) => {
    User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: 'child',
        balance: 0,
        admin_id: req.session.user_id
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

//EDIT a user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
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

router.put('/balance/:id', (req, res) => {
    User.update(
        {balance: req.body.balance},
        {where:{id: req.params.id} }
    )
    .then(dbUserData => {
        if (!dbUserData[0]) {
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

// DELETE a user
router.delete('/:id', (req, res) => {
  User.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'Sorry! No user found with this id.'})
          return
      }
      res.json(dbUserData)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json(err)
  })
});

//LOGIN Route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'Sorry! No user was found with that username!'})
            return
        }

        const validPassword = dbUserData.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400).json({ message: 'Sorry! The password entered was incorrect.'})
            return
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id
            req.session.username = dbUserData.username
            req.session.loggedIn = true

            res.json({ user: dbUserData, message: 'You are now logged in!'})
        })
    })
  
});

//LOGOUT Route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    }
    else {
        res.status(404).end()
    }
  
});


module.exports = router;