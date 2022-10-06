const express = require('express');
const { validateUpdateProfile } = require('../middlewares/validators');

const router = express.Router();
const {
  updateProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', validateUpdateProfile, updateProfile);

module.exports = router;
