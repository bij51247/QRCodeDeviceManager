const DevicePost = require('../models/DevicePost');

module.exports = async (req, res) => {
  const device = await DevicePost.findOne({ uuid: req.body.uuid })
  res.json(device);
};