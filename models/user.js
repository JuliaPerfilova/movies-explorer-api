const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { MESSAGES } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: MESSAGES.WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(MESSAGES.WRONG_USER_DATA));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(MESSAGES.WRONG_USER_DATA));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
