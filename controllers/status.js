const DevicePost = require('../models/DevicePost');
const User = require('../models/User');

module.exports = async (req, res) => {
  const deviceposts = await DevicePost.find({ deviceid: req.session.userId })
  res.render('status', {
    deviceposts
  });
};