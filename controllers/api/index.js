const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plannerRoutes = requrie('./plannerRoutes');

router.use('/users', userRoutes);
router.use('./recipe', plannerRoutes);

module.exports = router;