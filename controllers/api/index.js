const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plannerRoutes = require('./plannerRoutes');
const finderRoutes = require('./finderRoutes')

router.use('/user', userRoutes);
router.use('/planner', plannerRoutes);
router.use('/finder', finderRoutes);

module.exports = router;
