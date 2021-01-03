module.exports  = (req, res, next) => {
  if (req.files == null || req.body.device_name == null) {
    return res.redirect('/register')
  }
  next();
}