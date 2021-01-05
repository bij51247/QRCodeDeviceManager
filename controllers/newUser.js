
module.exports = (req, res) => {
  var username = '';
  var password = '';
  const data = req.flash('data')[0];

  if(typeof data != 'undefined'){
    username = data.username;
    password = data.password;
  }

  res.render('user', {
    errors: req.flash('validationErrors'),
    username:username,
    password:password
  });
};