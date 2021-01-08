const DevicePost = require('../models/DevicePost');

module.exports = async (req, res) => {
  const researchedName = req.body.name;
  var deviceposts;
  if (researchedName) {
    deviceposts = await DevicePost.find({ deviceid: req.session.userId, device_name: { $regex: researchedName } });
  } else {
    deviceposts = await DevicePost.find({ deviceid: req.session.userId });
  }

  res.render('status', {
    deviceposts
  })
}