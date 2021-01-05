const User = require('../models/User');

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
      req.flash('validationErrors', validationErrors);
      req.flash('data', req.body);
      return res.redirect('/newUser');
    }
    req.session.userId = user._id
    res.redirect('/home');
  })
};