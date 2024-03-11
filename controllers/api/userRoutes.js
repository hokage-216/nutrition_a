const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  res.render('dashboard', {showStats: true});
});

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

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

// Add route for creating new user

// Add route for deleting user

module.exports = router;