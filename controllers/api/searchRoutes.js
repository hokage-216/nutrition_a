
const express = require('express')
const Recipe = require('../../models/Recipe');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('dashboard', {showSearch: true});
});

router.post('/save', async (req, res) => {
  try {
    
    res.render('searchrecipe', { searchRan: true });

} catch (error) {
    res.status(500).send('Error fetching recipes');
}
});

module.exports = router; 

