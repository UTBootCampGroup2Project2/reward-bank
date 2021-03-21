const router = require('express').Router();

const userRoutes = require('./user-routes');
const rewardRoutes = require('./reward-routes');
const taskRoutes = require('./task-routes');


router.use('/users', userRoutes);
router.use('/rewards', rewardRoutes);
router.use('/tasks', taskRoutes);


module.exports = router;