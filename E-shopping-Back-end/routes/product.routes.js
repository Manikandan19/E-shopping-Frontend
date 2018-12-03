var express = require("express");
var router = express.Router();

var ProductController = require("../controllers/product.controller");
var checkAuthentication = require('../middleware/admin-authentication');

router.get("/getTotalProduct", ProductController.getTotalProducts);

router.post("/getProduct", ProductController.getProduct);

router.post("/registration", checkAuthentication, ProductController.productRegistration);

router.post("/delete", checkAuthentication, ProductController.deleteProduct);

router.post("/update", checkAuthentication, ProductController.updateProduct);

router.post("/getProductType", ProductController.getProductByType);

module.exports = router;
