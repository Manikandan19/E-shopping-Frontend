var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller');

router.post('/login', UserController.login);

router.post('/registration', UserController.registration);

router.post('/registration/verifyEmail', UserController.registrationVerifyEmail);

router.post('/changePassword', UserController.changePassword);

router.post('/changePassword/verifyEmail', UserController.changePasswordVerifyEmail);

module.exports = router;