const express = require('express');

const router = express.Router();
const usersApi = require('./users');
const profileApi = require('./profile');
const loginWithGoogleApi = require('./loginWithGoogle');

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});



router.use(loginWithGoogleApi)
router.use(usersApi)
router.use(profileApi)

module.exports = router;
