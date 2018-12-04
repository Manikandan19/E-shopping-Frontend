var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller');
var ProductController = require('../controllers/product.controller');

router.post('/login', UserController.login);

router.post('/registration', UserController.registration);

router.post('/registration/verifyEmail', UserController.registrationVerifyEmail);

router.post('/changePassword', UserController.changePassword);

router.post('/changePassword/verifyEmail', UserController.changePasswordVerifyEmail);

router.post('/getOrderProduct', ProductController.getOrderProduct);

module.exports = router;