const mongoose = require('mongoose');

const DeviePost = require('./models/DevicePost');

mongoose.connect('mongodb://localhost/device_database', {
  useNewUrlParser: true
})

DeviePost.create({
  device_name: 'テスト',
  qrImgSrc: 'test',
  uuid: 'tteessttoo',
  image: '/img/',
  imageSrc: 'これはいける？',
  datePosted: ''
},(error,devicepost)=>{
  console.log(error,devicepost);
})