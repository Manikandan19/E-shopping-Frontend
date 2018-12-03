// MongoDB - Object Data Modelling - Mongoose library
var mongoose = require("mongoose");
// User model
var User = require("../model/user.model");
// Json web token
var jwt = require('jsonwebtoken');
// Password encryption
var bcrypt = require("bcrypt");
// Rest API call - Email OTP
var request = require("request");
// Static secret key constant for Json Web Token generation
var secretKey = require('../constant')

// User login
exports.login = (req, res, next) => {
  console.log(req.body);
  User.find({ email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1) {
        let invalidEmail = {
          message: "Invalid-mail"
        };
        res.send(invalidEmail);
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(401).json({
              error: err
            });
          }
          if (result) {
              const token = jwt.sign({
                userId: user[0]._id,
                userName: user[0].username,
                email: user[0].email,
                phone: user[0].phone,
                role: user[0].role,
                createdOn: user[0].createdOn
              }, secretKey.SECRET_KEY , {expiresIn: '2h'});
            let successResult = {
              message: "success",
              token: token,
              role: user[0].role,
              email: user[0].email
            };
            res.send(successResult);
          } else {
            let invalidPassword = {
              message: "Invalid-password"
            };
            res.send(invalidPassword);
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// User registration
exports.registration = (req, res, next) => {
  console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        let emailResult = {
          message: 'Mail already exist'
        }
        res.send(emailResult);
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err
            });
          } else {
            var user = new User({
              _id: mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              phone: req.body.phone,
              password: hash,
              role: req.body.role
            });

            user
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
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// Registration verify email
exports.registrationVerifyEmail = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        var form = {
          email: req.body.email
        };
        request.post(
          { url: "http://172.16.144.166:3001/sendOTP", json: form },
          function(err, httpResponse, body) {
            if (err) throw err;
            if (body) {
              res.send(body);
            }
          }
        );
      } else {
        let emailResult = {
          message: "Email-exist"
        }
        res.send(emailResult);
        // res.status(401).json({
        //   message: "Email already exist"
        // });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// change password - verify email
exports.changePasswordVerifyEmail = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        let emailResult = {
          message: "Invalid-mail"
        }
        res.send(emailResult);
      } else if (user[0].email === req.body.email) {
        var form = {
          email: req.body.email
        };
        request.post(
          { url: "http://172.16.144.166:3001/sendOTP", json: form },
          function(err, httpResponse, body) {
            if (err) throw err;
            if (body) {
              res.send(body);
            }
          }
        );
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// change password
exports.changePassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err
      });
    }
    if (hash) {
      User.findOneAndUpdate(
        { email: req.body.email },
        { $set: { password: hash } },
        (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Invalid data"
            });
          }
          if (result) {
            res.status(200).json({
              message: "success"
            });
          } else {
            res.status(200).json({
              message: "failure"
            });
          }
        }
      );
    }
  });
};
