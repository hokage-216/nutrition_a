const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    res.render('dashboard', {showFinder: true});
  });

module.exports = router;