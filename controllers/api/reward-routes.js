const router = require('express').Router();
const { Reward } = require("../../models");

// GET all: /api/rewards
router.get('/', (req, res) => {
  Reward.findAll({ })
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

// GET one: /api/rewards/1
router.get('/:id', (req, res) => {
  Reward.findOne({ where:
    { id: req.params.id }
  })
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

// POST /api/rewards
router.post('/', (req, res) => {
  Reward.create({
    name: req.body.name,
    cost: req.body.cost,
    status: req.body.status,
    created_by_user_id: req.body.created_by_user_id
  })
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

// PUT one: /api/rewards/1
router.put('/:id', (req, res) => {
  Reward.update({ where: { id: req.params.id } },
  {
    name: req.body.name,
    cost: req.body.cost,
    status: req.body.status,
    created_by_user_id: req.body.created_by_user_id
  })
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

// DELETE one: /api/rewards/1
router.delete('/:id', (req, res) => {
  Reward.destroy({ where:
    { id: req.params.id }
  })
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

module.exports = router;