const router = require('express').Router();
const { Reward } = require("../../models");
const withAuth = require('../../utils/auth');

// GET all: /api/rewards
router.get('/', (req, res) => {
  Reward.findAll({ })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// GET one: /api/rewards/1
router.get('/:id', (req, res) => {
  Reward.findOne({ where:
    { id: req.params.id }
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// POST /api/rewards
router.post('/', withAuth, (req, res) => {
  Reward.create({
    name: req.body.name,
    cost: req.body.cost,
    status: req.body.status,
    created_by_user_id: req.session.user_id
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// PUT one: /api/rewards/1
router.put('/:id', withAuth, (req, res) => {
  Reward.update(
    {
    name: req.body.name,
    cost: req.body.cost,
    status: req.body.status,
    created_by_user_id: req.session.user_id
    },
    { where: { id: req.params.id }}
  )
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// DELETE one: /api/rewards/1
router.delete('/:id', withAuth, (req, res) => {
  Reward.destroy({ where:
    { id: req.params.id }
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;