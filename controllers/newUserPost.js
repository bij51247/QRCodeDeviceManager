const User = require('../models/User');

module.exports =  (req, res) => {
  User.create(req.body, (error, User) => {
    if (error) {
      return res.redirect('/newUser');
    }
    res.redirect('/home');
  })
};