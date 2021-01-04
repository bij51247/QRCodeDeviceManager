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
mongoose.connect('mongodb://localhost/device_database', {
  useNewUrlParser: true
})

const loginPageController = require('./controllers/loginPage');
const homeController = require('./controllers/home');
const logoutController = require('./controllers/logout');
const aboutController = require('./controllers/about');
const qrcodeController = require('./controllers/qrcode');
const statusController = require('./controllers/status');
const registerController = require('./controllers/register');
const newUserController = require('./controllers/newUser');

const newRegisterPostController = require('./controllers/newRegisterPost');
const newUserPostController = require('./controllers/newUserPost');
const generateController = require('./controllers/generate');
const readController = require('./controllers/read');
const loginController = require('./controllers/login');


app.get('/', loginPageController);
app.get('/home', authMiddleware, homeController);
app.get('/qrcode', authMiddleware, qrcodeController)
app.get('/about', authMiddleware, aboutController);
app.get('/logout', authMiddleware, logoutController);
app.get('/status', authMiddleware, statusController);
app.get('/register', authMiddleware, registerController);
app.get('/newUser', newUserController);

app.post('/register/new', newRegisterPostController);
app.post('/user/new', newUserPostController);
app.post('/generate', generateController);
app.post('/user/login', loginController);
app.post('/read', readController);



// app.get('/', (req, res) => {
//   res.render('index');
// });
// app.get('/home', authMiddleware, (req, res) => {
//   if (req.session.userId) {
//     return res.render('home');
//   }
//   res.redirect('/');
//   // res.render('/home');
// });
// app.get('/qrcode', authMiddleware, async (req, res) => {
//   res.render('qrcode');
// });
// app.get('/about', authMiddleware, async (req, res) => {
//   res.render('about');
// });
// app.get('/logout', authMiddleware, async (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('/');
//   })
// });
// app.get('/status', async (req, res) => {
//   const deviceposts = await DevicePost.find({});
//   console.log(req.session);
//   res.render('status', {
//     deviceposts
//   });
// });
// app.get('/register', authMiddleware, (req, res) => {
//   res.render('register')
// });
// app.get('/borrow_return', authMiddleware, (req, res) => {
//   res.render('borrow_return');
// });
// app.get('/newUser', authMiddleware, (req, res) => {
//   res.render('user');
// });

// app.post('/register/new', (req, res) => {
//   console.log(req.body);
//   let image = req.files.image;
//   image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
//     await DevicePost.create({
//       ...req.body,
//       image: '/img/' + image.name,
//     });
//     res.redirect('/home');
//   });
// });
// app.post('/user/new', (req, res) => {
//   User.create(req.body, (error, User) => {
//     if (error) {
//       return res.redirect('/newUser');
//     }
//     res.redirect('/home');
//   })
// });
// app.post('/user/login', (req, res) => {
//   const { username, password } = req.body;

//   User.findOne({ username: username }, (error, user) => {
//     if (user) {
//       bcrypt.compare(password, user.password, (error, same) => {
//         if (same) {
//           req.session.userId = user._id;
//           res.redirect('/home');
//         }
//         else {
//           res.redirect('/');
//         }
//       });
//     } else {
//       res.redirect('/');
//     }
//   });
// });
// app.post('/generate', (req, res) => {
//   QRCode.toCanvas(canvas, req.body.uuid, options, function (error) {
//     const ctx = canvas.getContext('2d');
//     ctx.font = '10px Impact';
//     ctx.fillStyle = 'blue';
//     ctx.fillText(req.body.name, 15, 10);
//     var image_src = canvas.toDataURL();
//     res.send(image_src);
//   });
// });

// app.post('/generate/new', (req, res) => {
//   let image = req.files.image;
//   console.log(req.body.uuid);
//   image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
//     await DevicePost.create({
//       // ...req.body,
//       device_name: req.body.device_name,
//       uuid: req.body.uuid,
//       image: '/img/' + image.name,
//     });
//     res.redirect('/home');
//   });
// });

app.use((req, res) => {
  res.render('notfound');
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, () => {
  console.log('running');
}); 
