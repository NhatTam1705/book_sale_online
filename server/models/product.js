const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name can not exceed 100 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please slect category for this product!'],
    enum: {
      values: ['English Book', 'Vietnamese Book'],
      message: 'Please select conrect category for this product',
    },
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    trim: true,
    maxLength: [5, 'Product name can not exceed 5 characters'],
    default: 0.0,
  },
});
module.exports = mongoose.model('Product', productSchema);
