const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  res.render('dashboard', {showStats: true});
});

// update user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Contains the fields to update
  try {
    await User.update(updateData, {
      where: { id }
    });
    res.send('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user information');
  }
});

// delete user
router.delete(':id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: { id }
    });
    res.send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
});

// create user
router.post('/signup', async (req, res) => {
  const { email, password, first_name, last_name, sex, height_ft, height_in, weight, age, activity_level} = req.body;
  try {
    // update user in the database
    await User.create({email, password, first_name, last_name, sex, height_ft, height_in, weight, age, activity_level});
    res.render('signup_success'); // redirect or send a success response
    console.log('User Updated Successfully');
  } catch (error) {
    res.status(500).json({ error: 'Error creating user information' });
  }
});

module.exports = router;