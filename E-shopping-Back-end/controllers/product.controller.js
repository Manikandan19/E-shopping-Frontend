// var mongoose = require("mongoose");
var Product = require("../model/product.model");


// to get total products from DB
exports.getTotalProducts = (req, res) => {
    Product.find().exec()
    .then(result => {
        if(result.length >= 1) {
            res.status(200).send(result);
        } else {
            res.status(404).send(result);
        }
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    });
};

//to get products by it's type(Eg-Mobile, Watches and etc,.)
exports.getProductByType = (req, res) => {
    console.log(req.body);
    Product.find({productType: req.body.productType})
    .exec()
    .then( result => {
            res.status(200).send(result);
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    });
};

//to get an single product by it's productName
exports.getProduct = (req, res) => {
    Product.find({productName: req.body.productName})
    .exec()
    .then( result => {
         if(result.length == 1) {
            res.status(200).send(result)
            // console.log(result)
        }
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
}


//to get an single product by it's productName  --- Order
exports.getOrderProduct = (req, res) => {
    console.log('Name - ', req.body.productName);
    Product.findOne({productName: req.body.productName})
    .select('productName productPrice productDiscount imageLocation')
    .exec()
    .then( result => {
        if(result !== null) {
            var resultArray = new Array();
            resultArray.push(result);
            res.status(200).send(resultArray);
        } else {
            res.status(200).send({
                message: 'Not-exist'
            })
        }

    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
}

// Admin functionality - Product registration
exports.productRegistration = (req, res, next) => {
    Product.find({productName: req.body.productName})
    .exec()
    .then( result => {
        if(result.length >= 1) {
            res.status(302).json({
                result: 'product already exist'
            });
        } else {
            var product = new Product({
                productName: req.body.productName,
                productType: req.body.productType,
                productPrice: req.body.productPrice,
                offer: req.body.offer,
                stock: req.body.stock,
                productBrand: req.body.productBrand,
                imageLocation: req.body.imageLocation,
                specification: req.body.specification,
                description: req.body.description,
                productColor: req.body.productColor,
                productDiscount: req.body.productDiscount
            });

            product.save()
            .then( result => {
                if(result) {
                    res.status(201).json({
                        message: 'success',
                        result: result
                    })
                } else { 
                    res.status(404).json({
                        message: 'failure',
                        result: ''
                    })
                }
            })
            .catch( err => {
                res.status(500).json({
                    error: err
                })
            })

        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
};

// Admin functionality - Product deletion
exports.deleteProduct = (req, res) => {
    Product.deleteOne({productName: req.body.productName})
    .exec()
    .then( result => {
        if(result.length == 1) {
            res.status(200).json({
                message: 'success'
            })
        } else {
            res.status(404).json({
                message: 'failure'
            })
        }
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    })
};

// Admin functionality - Product update
exports.updateProduct = (req, res) => {
    Product.updateOne({_id: re1.body._id})
    .exec()
    .then(result => {
        if(result.length === 1) {
            res.status(200).json({
                message: 'success'
            });
        } else {
            res.status(304).json({
                message: 'failure'
            })
        }
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    });
}