const express = require('express');
const router = express.Router();
const passportConfig = require('../config/passport.config');
const authController = require('../controllers/auth.controller');

router.post('/', authController.authenticate);
router.delete('/', passportConfig.isAuthenticated, authController.logout);

module.exports = router;