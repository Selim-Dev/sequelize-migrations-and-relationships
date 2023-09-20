const express = require('express');
const { isUserAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.get('/profile',(req, res) => {
  res.json(['😀', '😳', '🙄']);
});

module.exports = router;
