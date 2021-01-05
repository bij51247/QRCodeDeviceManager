const DevicePost = require('../models/DevicePost');

module.exports = async (req, res) => {
  var uuid = req.body.uuid;
  await DevicePost.update({ uuid: uuid },
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