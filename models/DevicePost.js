const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DevicePostSchema = new Schema({
  user: {
    type: String,
    default: null,
  },
  datePosted: {
    type: Date,
    default: '',
  },
  deviceid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: String,
  qrImgSrc: String,
  device_name: String,
  uuid: String,
  location: {
    type: String,
    default: "",
  },
  flag: {
    type: Boolean,
    default: true,
  }
});

const DevicePost = mongoose.model('DevicePost', DevicePostSchema);

module.exports = DevicePost;