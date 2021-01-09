const { check} = require('express-validator');

module.exports = [
  check('username').not().isEmpty().withMessage('ユーザー名をを記入して下さい'),
  check('password').not().isEmpty().withMessage('パスワードをを記入して下さい'),
]
