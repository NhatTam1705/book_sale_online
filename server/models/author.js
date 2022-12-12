const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter author name'],
    trim: true,
    maxLength: [30, 'Author name can not exceed 30 characters'],
  },
  introduce: {
    type: String,
    required: [true, 'Please enter author introduce'],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Author', authorSchema);
