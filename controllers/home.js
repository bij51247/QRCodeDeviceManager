
module.exports = (req,res)=>{
   if  (req.session.userId) {
    return res.render('home');
  }
  res.redirect('/');
  // res.render('home');
}
