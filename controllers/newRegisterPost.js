const DevicePost = require('../models/DevicePost');
const path = require('path');

module.exports = async (req, res) => {
  let image = req.files.image;
  // console.log(req.body.imageSrc)
  image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
    await DevicePost.create({
      device_name: req.body.device_name,
      qrImgSrc: req.body.qrImgSrc,
      uuid: req.body.uuid,
      image: '/img/' + image.name,
      imageSrc: req.body.imageSrc,
      deviceid: req.session.userId,
      datePosted: ''
    });
    res.redirect('/home');
  });
  // console.log(req.body.image);
  // await DevicePost.create({
  //   device_name: req.body.device_name,
  //   qrImgSrc: req.body.qrImgSrc,
  //   uuid: req.body.uuid,
  //   image: req.body.imageSrc,
  //   deviceid: req.session.userId,
  //   datePosted: ''
  // });
  // res.redirect('/home');
};