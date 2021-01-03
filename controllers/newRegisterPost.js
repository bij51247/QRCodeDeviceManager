const DevicePost = require('../models/DevicePost');
const path = require('path');

module.exports = (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname,'..','public/img', image.name), async (error) => {
    await DevicePost.create({
      ...req.body,
      image: '/img/' + image.name,
    });
    res.redirect('/home');
  });
}