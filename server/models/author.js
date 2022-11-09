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
    maxLength: [150, 'Author description can not exceed 150 characters'],
    default: 'No decription',
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
