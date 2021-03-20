const router = require('express').Router();

const userRoutes = require('./user-routes');
const taskHistoryRoutes = require('./task-history-routes');
const rewardHistoryRoutes = require('./reward-history-routes');

router.use('/users', userRoutes);
router.use('/task-history', taskHistoryRoutes);
router.use('/reward-history', rewardHistoryRoutes);



module.exports = router;