const express = require('express');
const router = express.Router();
router.get('/expenses', (req, res) => {
  res.json({ message: 'Expenses fetched successfully' });
});

module.exports = router;
