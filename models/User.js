const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrytp = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'ユーザー名を入力して下さい'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'パスーワードを入力して下さい'],
  },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
  const user = this;

  bcrytp.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;