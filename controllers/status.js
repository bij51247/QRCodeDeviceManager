const DevicePost = require('../models/DevicePost');

module.exports = async (req, res) => {
  const deviceposts = await DevicePost.find({});
  console.log(req.session);
  res.render('status', {
    deviceposts
  });
};