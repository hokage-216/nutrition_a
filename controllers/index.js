const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.get('/', (req, res) => res.render(path.join(__dirname, './index.html')))

module.exports = router;