var express = require("express");
var router = express.Router();

var OrderController = require("../controllers/order.controller");
var checkAuthentication = require('../middleware/user-authentication');

router.post("/getCart",  OrderController.cartDetails);

router.post("/addToCart",  OrderController.addToCart);

router.post("/deleteFromCart",  OrderController.deleteFromCart);

router.post("/addToPurchase", OrderController.addToPurchase);

router.post("/deleteFromPurchase", OrderController.deleteFromPurchase);

module.exports = router;
