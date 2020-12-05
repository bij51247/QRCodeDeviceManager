const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/home', (req, res) => {
  res.render('home');
});
app.get('/borrow', (req, res) => {
  res.render('borrow');
});
app.get('/status', (req, res) => {
  res.render('status');
});
app.get('/register', (req, res) => {
  res.render('register');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, () => {
  console.log('running');
}); 
