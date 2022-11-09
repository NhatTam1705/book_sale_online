const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter discount name'],
    trim: true,
    maxLength: [100, 'Discount name can not exceed 100 characters'],
  },
  percent: {
    type: Number,
    required: [true, 'Please enter discount percent'],
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: 'Please enter discount percent with integer value',
    },
    min: [0, 'Please enter greater than 0'],  
    max: [100, 'Please enter less than 100'],
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

module.exports = mongoose.model('Discount', discountSchema);
