const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DevicePostSchema = new Schema({
  user:{
    type:String,
    default:"",
  },
  image: String,
  device_name: String,
  location:{
    type:String,
    default:"",
  },
});

const DevicePost = mongoose.model('DevicePost', DevicePostSchema);

module.exports = DevicePost;