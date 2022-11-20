const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { isNullOrUndefined } = require('util');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, ' Your name can not exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password must be longer than 8 character'],
    select: false,
  },
  birthday: {
    type: String, 
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Orther'],
      message: 'Please select correct gender for user',
    },
  },
  avatar: {
    public_id: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//encryping password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user's password
userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};
// return JWS token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  //Hash and set to resetPassword
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //set token expires time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model('User', userSchema);
