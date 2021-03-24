const router = require('express').Router();

const userRoutes = require('./user-routes');
const taskRoutes = require('./task-routes');
const rewardRoutes = require('./reward-routes');
const taskHistoryRoutes = require('./task-history-routes');
const rewardHistoryRoutes = require('./reward-history-routes');

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/task-history', taskHistoryRoutes);
router.use('/rewards', rewardRoutes);
router.use('/reward-history', rewardHistoryRoutes);

module.exports = router;