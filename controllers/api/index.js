const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plannerRoutes = require('./plannerRoutes');
const nutritionRoutes = require('./nutritionRoutes');

router.use('/users', userRoutes);
router.use('/planner', plannerRoutes);
router.use('/nutrition', nutritionRoutes);

module.exports = router;
