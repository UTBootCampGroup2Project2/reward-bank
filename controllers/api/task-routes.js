const router = require('express').Router();
const { Task } = require("../../models");

// GET all: /api/tasks
router.get('/', (req, res) => {
  Task.findAll({ })
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

// GET one: /api/tasks/1
router.get('/:id', (req, res) => {
  Task.findOne({ where:
    { id: req.params.id }
  })
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

// POST /api/tasks
router.post('/', (req, res) => {
  Task.create({
    name: req.body.name,
    value: req.body.value,
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

// PUT one: /api/tasks/1
router.put('/:id', (req, res) => {
  Task.update(
    {
    name: req.body.name,
    value: req.body.value,
    status: req.body.status,
    created_by_user_id: req.body.created_by_user_id
    },
    { where: { id: req.params.id }}
  )
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

// DELETE one: /api/tasks/1
router.delete('/:id', (req, res) => {
  Task.destroy({ where:
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