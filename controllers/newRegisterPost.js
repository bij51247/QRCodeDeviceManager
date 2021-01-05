const DevicePost = require('../models/DevicePost');
const path = require('path');

module.exports = (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
    await DevicePost.create({
      device_name: req.body.device_name,
      qrImgSrc: req.body.qrImgSrc,
      uuid: req.body.uuid,
      image: '/img/' + image.name,
    });
    res.redirect('/home');
  });
};