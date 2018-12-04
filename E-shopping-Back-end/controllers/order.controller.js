var Order = require('../model/order.model');
var Product = require('../model/product.model');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

exports.cartDetails = (req, res, next) => {
    Order.find({
        email: req.body.email
    }).then(orders => {
        if (orders.length >= 1) {
            var totalProduct = [];
            orders.forEach(order => {
                if (order.cart === true) {
                    totalProduct.push(Product.findOne({
                        productName: order.productName
                    }).select('productName productPrice imageLocation productDiscount'));
                } else {
                    console.log('Product not in cart');
                }
            });
            return Promise.all(totalProduct);
        } else {
            res.send({
                message: 'Not available'
            })
        }
    }).then(listOfOrder => {
        res.send(listOfOrder);
    }).catch(err => {
        res.status(500).send('Email ID not found', err);
    });
}

exports.addToCart = (req, res, next) => {

    Order.findOne({
            email: req.body.email,
            productName: req.body.productName
        })
        .exec()
        .then(order => {
            if (order === null) {
                console.log('Inside null');
                var order = new Order({
                    productName: req.body.productName,
                    email: req.body.email,
                    phone: req.body.phone,
                    cart: true,
                    purchased: false,
                    delivered: false,
                    shipped: false,
                    delivery: Object
                });

                order
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "success",
                            result: result
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            } else if (order.cart === false) {
                Order.findOneAndUpdate({
                        email: req.body.email,
                        productName: req.body.productName
                    }, {
                        $set: {
                            cart: true
                        }
                    }).exec()
                    .then(o => {
                        res.send({
                            message: 'success'
                        })
                    }).catch(err => {
                        res.status(500).send({
                            error: err
                        })
                    })
            } else {
                res.status(200).send({
                    message: 'Product-exist'
                })
            }
        }).catch(err => {
            res.status(500).send({
                error: err
            })
        })
}

exports.deleteFromCart = (req, res, next) => {

    Order.findOne({
            email: req.body.email,
            productName: req.body.productName
        })
        .exec()
        .then(order => {
            if (order !== null) {
                if (order.cart == true) {
                    Order.findOneAndUpdate({
                            productName: req.body.productName
                        }, {
                            $set: {
                                cart: false
                            }
                        })
                        .exec()
                        .then(o => {
                            res.send({
                                message: 'success'
                            })
                        }).catch(err => {
                            res.status(500).send({
                                error: err
                            })
                        })
                } else {
                    res.status(200).send({
                        message: 'Not exist'
                    })
                }

            } else {
                res.status(200).send({
                    message: 'product does not exist'
                })
            }

            // }
        })
        .catch(err => {
            res.status(500).send({
                error: err
            });
        })
}


exports.addToPurchase = (req, res, next) => {
    Order.findOne({
            email: req.body.email,
            productName: req.body.productName
        })
        .exec()
        .then(order => {
            if (order === null) {
                var order = new Order({
                    productName: req.body.productName,
                    email: req.body.email,
                    phone: req.body.phone,
                    cart: false,
                    purchased: true,
                    delivered: false,
                    shipped: false,
                    delivery: req.body.address
                });

                order
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "success",
                            result: result
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            } else if (order.purchased === false) {
                Order.findOneAndUpdate({
                        email: req.body.email,
                        productName: req.body.productName
                    }, {
                        $set: {
                            cart: false,
                            purchased: true,
                            delivered: false,
                            shipped: false,
                            delivery : req.body.address
                        }
                    }).exec()
                    .then(o => {
                        res.send({
                            message: 'success'
                        })
                    }).catch(err => {
                        res.status(501).send({
                            error: err
                        })
                    })
            } else {
                res.status(200).send({
                    message: 'Product already exist'
                })
            }
        }).catch(err => {
            res.status(500).send({
                error: err
            })
        })
}


exports.deleteFromPurchase = (req, res, next) => {

    Order.findOne({
            email: req.body.email,
            productName: req.body.productName
        })
        .exec()
        .then(order => {
            if (order !== null) {
                if (order.purchased == true) {
                    Order.findOneAndUpdate({
                            productName: req.body.productName
                        }, {
                            $set: {
                                purchased: false,
                                cart: false
                            }
                        })
                        .exec()
                        .then(o => {
                            console.log('!!!!!!');
                            res.send({
                                message: 'success'
                            })
                        }).catch(err => {
                            res.status(500).send({
                                error: err
                            })
                        })
                } else {
                    res.status(200).send({
                        message: 'product is not in purchased'
                    })
                }

            } else {
                res.status(200).send({
                    message: 'product does not exist'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                error: err
            });
        })
}






















// console.log(req.body.email);
// Order.find({email: req.body.email})
// .select('productName')
// .exec()
// .then(
//     order => {
//         console.log(order);
//         // console.log(order[1]);
//             Product.findOne({productName: order.productName})
//             .select('productName productPrice productDiscount imageLocation')
//             .exec()
//             .then(
//                 product => {
//                     console.log(product);
//                     // console.log(product[0]);
//                         res.send(product);
//                 }
//             )
//             .catch(
//                 err => {
//                     res.status(500).json({
//                         error: err
//                     });
//                 }
//             )
//         }
// )
// .catch(
//     err => {
//         res.status(500).json({
//             error: err
//         });
//     }
// )