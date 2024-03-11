const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plannerRoutes = require('./plannerRoutes');
const nutritionRoutes = require('./nutritionRoutes');
const controller = require('./controller');
const finderRoutes = require('./finderRoutes')

router.get('/recipes/search/:query', controller);
router.use('/search', controller);
router.use('/users', userRoutes);
router.use('/planner', plannerRoutes);
router.use('/finder', finderRoutes);

module.exports = router;
