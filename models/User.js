const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrytp = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'ユーザー名を入力して下さい'],
    unique: [true, '既に登録されているユーザー名です']
  },
  password: {
    type: String,
    required: [true, 'パスーワードを入力して下さい'],
  },
});

UserSchema.plugin(uniqueValidator, { message: 'このユーザー名はすでに使用されています' });

UserSchema.pre('save', function (next) {
  const user = this;

  bcrytp.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;