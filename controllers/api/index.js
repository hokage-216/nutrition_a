const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plannerRoutes = require('./plannerRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/search', searchRoutes);
router.use('/users', userRoutes);
router.use('/planner', plannerRoutes);

module.exports = router;
