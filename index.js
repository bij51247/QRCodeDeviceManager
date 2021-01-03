const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');

const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const bcrypt = require('bcrypt');

const validateMiddleWare = require('./middleware/validateMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(fileUpload());
app.use('/register/new', validateMiddleWare);

app.use(expressSession({
  secret: 'keyboard cat'
}));

const mongoose = require('mongoose');
const DevicePost = require('./models/DevicePost');
const User = require('./models/User');
mongoose.connect('mongodb://localhost/device_database', {
  useNewUrlParser: true
})

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/home', (req, res) => {
  if (req.session.userId) {
    return res.render('home');
  }
  res.redirect('/');
  // res.render('/home');
});
app.get('/qrcode', async (req, res) => {
  res.render('qrcode');
});

app.get('/status', async (req, res) => {
  const deviceposts = await DevicePost.find({});
  console.log(req.session);
  res.render('status', {
    deviceposts
  });
});
app.get('/register', (req, res) => {
  res.render('register')
});
app.get('/borrow_return', (req, res) => {
  res.render('borrow_return');
});
app.get('/newUser', (req, res) => {
  res.render('user');
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

app.post('/qrcode/borrow_return', async (req, res) => {
  const devicepost = await DevicePost.findOne({ device_name: req.body.device_name });
  console.log(devicepost);
  res.render('borrow_return', {
    devicepost: devicepost
  });
});


app.post('/user/new', (req, res) => {
  User.create(req.body, (error, User) => {
    if (error) {
      return res.redirect('/newUser');
    }
    res.redirect('/home');
  })
});

app.post('/user/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          res.redirect('/home');
        }
        else {
          res.redirect('/');
        }
      });
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, () => {
  console.log('running');
}); 
