const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

module.exports = (req, res) => {

  const { username, password } = req.body;
  var loginErrors = [];
  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          res.redirect('/home');
        }
        else {
          loginErrors.push('パスワードを正しく入力して下さい')
          res.render('index', {
            errors: loginErrors,
          })
        }
      });
    } else {
      loginErrors.push('入力に誤りがあります')
      res.render('index', {
        errors: loginErrors,
      })
    }
  });
}