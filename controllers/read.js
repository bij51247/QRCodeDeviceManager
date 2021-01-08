const DevicePost = require('../models/DevicePost');

module.exports = async (req, res) => {
  await DevicePost.findOne({ uuid: req.body.uuid }, (error, device) => {
    if (device) {
      res.json(device);
    } else {
      const message = 'このQRコードは登録されていません';
      res.send(message)
    }
  })
};