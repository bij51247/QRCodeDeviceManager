const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(fileUpload());

const mongoose = require('mongoose');
const DevicePost = require('./models/DevicePost');
mongoose.connect('mongodb://localhost/device_database', {
  useNewUrlParser: true
})

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/home', (req, res) => {
  res.render('home');
});
app.get('/borrow', (req, res) => {
  res.render('borrow');
});
app.get('/status', async (req, res) => {
  const deviceposts = await DevicePost.find({});
  res.render('status', {
    deviceposts
  });
});
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register/new', (req, res) => {
  console.log(req.body);
  let image = req.files.image;
  image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
    await DevicePost.create({
      ...req.body,
      image: '/img/' + image.name,
    });
    res.redirect('/home');
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, () => {
  console.log('running');
}); 
