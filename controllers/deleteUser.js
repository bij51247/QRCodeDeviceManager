const User = require('../models/User');
const DevicePost = require('../models/DevicePost');

module.exports = async (req, res) => {
  await User.findByIdAndRemove(req.session.userId, function (err) {
    if (err) throw err;
  });
  await DevicePost.remove({ deviceid: req.session.userId });
  res.redirect('/');
}