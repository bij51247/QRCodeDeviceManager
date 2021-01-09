const { check } = require('express-validator');
module.exports = [
  check("password", "半角英小文字大文字数字をそれぞれ1種類以上8文字以上").matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/),
  check('password').custom((value,{req})=>{
    if (req.body.password !== req.body.passwordConfirmation){
      throw new Error('パスワードが一致していません');
    }
    return true;
  })
]