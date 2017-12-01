const express = require('express');
const router = express.Router();
const passportConfig = require('../config/passport.config');
const uploadConfig = require('../config/multer.config');
const usersController = require('../controllers/users.controller');


router.get('/:id', passportConfig.isAuthenticated, usersController.get);
router.post('/:id', passportConfig.isAuthenticated, uploadConfig.single('file'), usersController.edit);
router.get('/', passportConfig.isAuthenticated, usersController.list);
router.post('/', usersController.create);

module.exports = router;