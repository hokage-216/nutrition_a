const router = require('express').Router();
const { User } = require('../../models');

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

module.exports = router;