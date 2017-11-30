const express = require('express');
const router = express.Router();
const passportConfig = require('../config/passport.config');
const usersController = require('../controllers/users.controller');

router.get('/:id', passportConfig.isAuthenticated, usersController.get);
router.get('/', passportConfig.isAuthenticated, usersController.list);
router.post('/', usersController.create);

module.exports = router;