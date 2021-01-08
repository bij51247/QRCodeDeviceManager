const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(flash());

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

const DevicePost = require('./models/DevicePost')

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
const detailController = require('./controllers/detail');

const newRegisterPostController = require('./controllers/newRegisterPost');
const newUserPostController = require('./controllers/newUserPost');
const generateController = require('./controllers/generate');
const readController = require('./controllers/read');
const loginController = require('./controllers/login');
const borrowPostController = require('./controllers/borrowPost');
const returnPostController = require('./controllers/returnPost');
const deleteDeviceController = require('./controllers/deleteDevice');
const deleteUserController = require('./controllers/deleteUser');
const researchController = require('./controllers/research');

app.get('/', loginPageController);
app.get('/home', authMiddleware, homeController); //add atuthMiddel
app.get('/qrcode', authMiddleware, qrcodeController)
app.get('/about', authMiddleware, aboutController);//and home.js
app.get('/logout', authMiddleware, logoutController);
app.get('/status', authMiddleware, statusController);
app.get('/status/:id', authMiddleware, detailController);
app.get('/register', authMiddleware, registerController);//to here
app.get('/newUser', newUserController);

app.post('/register/new', newRegisterPostController);
app.post('/user/new', newUserPostController);
app.post('/generate', generateController);
app.post('/user/login', loginController);
app.post('/read', readController);
app.post('/borrow', borrowPostController);
app.post('/deleteDevice', deleteDeviceController);
app.post('/deleteUser', deleteUserController);
app.post('/return', returnPostController);
app.post('/research', researchController);

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
