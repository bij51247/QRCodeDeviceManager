const DevicePost = require('../models/DevicePost');

module.exports = async (req,res)=>{
  console.log(req.body.uuid);
  await DevicePost.remove({ uuid: req.body.uuid});
  res.redirect('/status');
}