const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plannerRoutes = requrie('./plannerRoutes');
const nutritionRoutes = require('./nutritionsRoutes');

router.use('/users', userRoutes);
router.use('./recipe', plannerRoutes);
router.use('./nutrition', nutritionRoutes);

module.exports = router;
