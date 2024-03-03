const express = require('express');
const router = express.Router();
const plannerRoutes = require('./plannerRoutes');

router.use('/api/planner', plannerRoutes);

module.exports = router;
