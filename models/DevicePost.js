const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DevicePostSchema = new Schema({
  user: {
    type: String,
    default: null,
  },
  // datePosted: {
  //   type: Date,
  //   default: '',
  // },
  image: String,
  device_name: String,
  location: {
    type: String,
    default: "",
  },
  check: {
    type: Boolean,
    default: true,
  }
});

const DevicePost = mongoose.model('DevicePost', DevicePostSchema);

module.exports = DevicePost;