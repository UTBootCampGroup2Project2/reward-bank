const router = require('express').Router();
const { User, Task_History, Task } = require("../../models");
const withAuth = require('../../utils/auth');

//Get all task history for a child 
router.get('/:childID', (req, res) => {
    Task_History.findAll({
        attributes: ['id', 'task_id', 'completed_by_user_id', 'status'],
        order: [['created_at', 'DESC']],
        where: {
            completed_by_user_id: req.params.childID
        },
        include: [
            {
                model: Task,
                attributes: ['name', 'value']
            }
        ]

    })
    .then(dbTaskHistoryData => {
        console.log(dbTaskHistoryData)
        if (!dbTaskHistoryData) {
            res.status(404).json({ message: 'Sorry! No task history was found for this user.'})
            return
        }
        res.json(dbTaskHistoryData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
  
})


//add new task history
router.post('/:childId', (req, res) => {
    Task_History.create({
        task_id: req.body.task_id,
        completed_by_user_id: req.params.childId,
        status: 'pending',
    })
    .then(dbTaskHistoryData => res.json(dbTaskHistoryData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//change task history status to complete
router.put('/:taskHistoryId', (req, res) => {
    Task_History.update({
        id: req.params.taskHistoryId,
        task_id: req.body.task_id,
        completed_by_user_id: req.body.completed_by_user_id,
        status: req.body.status,
    })
    .then(dbTaskHistoryData => res.json(dbTaskHistoryData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//delete task history
router.delete('/:id', (req, res) => {
    Task_History.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTaskHistoryData => {
        if (!dbTaskHistoryData) {
            res.status(404).json({ message: 'Sorry! No task history was found with this id.'})
            return
        }
        res.json(dbTaskHistoryData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
  });

  module.exports = router;