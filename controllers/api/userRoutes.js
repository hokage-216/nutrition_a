const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  res.render('dashboard', {showStats: true});
});

// update user

// create user
router.post('/signup', async (req, res) => {
  const { email, password, first_name, last_name, sex, height_ft, height_in, weight, age, activity_level} = req.body;
  try {
    // update user in the database
    await User.create({email, password, first_name, last_name, sex, height_ft, height_in, weight, age, activity_level});
    res.redirect('signup_success'); // redirect or send a success response
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user information');
  }
});

// delete user

module.exports = router;