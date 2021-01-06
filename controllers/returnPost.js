const DevicePost = require('../models/DevicePost');

module.exports = async (req, res) => {
  var uuid = req.body.uuid;
  await DevicePost.update({ deviceid: req.session.userId, uuid: uuid },
    {
      $set: {
        user: '',
        flag: true,
        location: '',
        datePosted: ''
      }
    }
  );
  res.redirect('/home')
}