const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter advertisement name'],
    trim: true,
    maxLength: [100, 'Advertisement name can not exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please enter advertisement description'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Advertisement', advertisementSchema);
