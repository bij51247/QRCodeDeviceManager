const DevicePost = require('../models/DevicePost');

module.exports = async (req, res) => {
  var datePosted = new Date();
  var user = req.body.user;
  var location = req.body.location;
  var uuid = req.body.uuid;
  await DevicePost.update({ uuid: uuid },
    {
      $set: {
        user: user,
        flag: false,
        location: location,
        datePosted: datePosted
      }
    }
  );
  res.redirect('/home')
}