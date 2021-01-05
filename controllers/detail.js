const DevicePost = require('../models/DevicePost.js');

module.exports = async (req, res) => {
  const devicepost = await DevicePost.findById(req.params.id)
  res.render('detail', {
    devicepost
  })
};