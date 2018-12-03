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
                totalProduct.push(Product.findOne({
                    productName: order.productName
                }).select('productName productPrice imageLocation productDiscount'));
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
            productName: req.body.productName,
            cart: true
        })
        .exec()
        .then(order => {
            console.log(order);
            if (order.length < 1) {
                var order = new Order({
                    productName: req.body.productName,
                    email: req.body.email,
                    phone: req.body.phone,
                    cart: true,
                    purchased: false,
                    delivered: false,
                    shipped: false,
                    address: Object
                });

                order
                    .save()
                    .then(result => {
                        console.log(result.length);
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

exports.deleteFromCart = (req, res, next) => {

    Order.find({
            email: req.body.email
        })
        .exec()
        .then(order => {
            if (order.length === 1) {
                Order.findOneAndUpdate({
                        productName: req.body.productName
                    }, {
                        $set: {
                            cart: false
                        }
                    })
                    .exec()
                    .then(o => {
                        if (o.length === 1) {
                            res.send({
                                message: 'success'
                            })
                        } else {
                            res.send({
                                message: 'failure'
                            })
                        }
                    }).catch(err => {
                        res.status(500).send({
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).send({
                error: err
            });
        })
}


exports.addToPurchase = (req, res, next) => {
    // Order.findOne({
    //         email: req.body.email,
    //         productName: req.body.productName,
    //         purchased: false
    //     })
    //     .exec()
    //     .then(order => {
    //         if (order === null) {
    //             console.log('Inside NULL');
    //             var order = new Order({
    //                 productName: req.body.productName,
    //                 email: req.body.email,
    //                 phone: req.body.phone,
    //                 cart: false,
    //                 purchased: true,
    //                 delivered: false,
    //                 shipped: false,
    //                 address: req.body.address
    //             });

    //             order
    //                 .save()
    //                 .then(result => {
    //                     res.status(201).json({
    //                         message: "success",
    //                         result: result
    //                     });
    //                 })
    //                 .catch(err => {
    //                     res.status(500).json({
    //                         error: err
    //                     });
    //                 });
    //         } else if (order.purchased === false) {
    //             console.log('Inside FALSE');
    //             order.findOneAndUpdate({
    //                     email: req.body.email,
    //                 }, {
    //                     $set: {
    //                         cart: false,
    //                         purchased: true,
    //                         delivered: false,
    //                         shipped: false,
    //                         address: req.body.address
    //                     }
    //                 }).exec()
    //                 .then(o => {
    //                         res.send({
    //                             message: 'success'
    //                         })
    //                         res.send({
    //                             message: 'failure'

    //                 }).catch(err => {
    //                     res.status(500).send({
    //                         error: err
    //                     })
    //                 })
    //         } else {
    //             res.status(200).send({
    //                 message: 'Product already exist'
    //             })
    //         }
    //     }).catch(err => {
    //         res.status(500).send({
    //             error: err
    //         })
    //     })
}


exports.deleteFromPurchase = (req, res, next) => {

    Order.find({
            email: req.body.email
        })
        .exec()
        .then(order => {
            if (order.length === 1) {
                Order.findOneAndUpdate({
                        productName: req.body.productName
                    }, {
                        $set: {
                            purchased: false
                        }
                    })
                    .exec()
                    .then(o => {
                        if (o.length === 1) {
                            res.send({
                                message: 'success'
                            })
                        } else {
                            res.send({
                                message: 'failure'
                            })
                        }
                    }).catch(err => {
                        res.status(500).send({
                            error: err
                        })
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