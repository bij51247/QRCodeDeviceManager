const DevicePost = require('../models/DevicePost');
const path = require('path');

// module.exports = (req, res) => {
//   let image = req.files.image;
//   image.mv(path.resolve(__dirname,'..','public/img', image.name), async (error) => {
//     await DevicePost.create({
//       // ...req.body,
//       device_name:req.body.device_name,
//       image: '/img/' + image.name,
//     });
//     res.redirect('/home');
//   });
// }
module.exports = (req, res) => {
  let image = req.files.image;
  console.log(req.body.uuid);
  image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
    await DevicePost.create({
      // ...req.body,
      device_name: req.body.device_name,
      uuid: req.body.uuid,
      image: '/img/' + image.name,
    });
    res.redirect('/home');
  });
};