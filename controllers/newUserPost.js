const User = require('../models/User');

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      return res.redirect('/newUser');
    }
    req.session.userId = user._id
    res.redirect('/home');
  })
};