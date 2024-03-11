const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  res.render('dashboard', {showStats: true});
});

// create user

// update user stats
router.put('/updateNutrition', async (req, res) => {
  const userId = req.session.userId;
  const { age, weight, } = req.body;
  try {
    // update user in the database
    await User.update({ age, weight /* other fields */ }, {
      where: { id: userId }
    });
    res.redirect('/successPage'); // redirect or send a success response
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user information');
  }
});

// delete user

module.exports = router;