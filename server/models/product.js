const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name can not exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  publishing: {
    type: String,
    required: [true, 'Please enter publishing house'],
  },
  issuing: {
    type: String,
    required: [true, 'Please enter issuing company'],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    default: 0.0,
  },
  stockInput: {
    type: Number,
    required: [true, 'Please enter product stock input'],
    default: 0.0,
  },
  format: {
    type: String,
    required: [true, 'Please select format for this product'],
    enum: {
      values: ['Hard cover', 'Paper back'],
      message: 'Please select correct format for product',
    },
  },
  language: {
    type: String,
    required: [true, 'Please select language for this product'],
    enum: {
      values: ['English', 'Vietnamese'],
      message: 'Please select correct language for product',
    },
  },
  costPrice: {
    type: Number,
    required: [true, 'Please enter product cost price'],
    trim: true,
    maxLength: [10, 'Product cost price can not exceed 10 characters'],
    default: 0.0,
  },
  soldPrice: {
    type: Number,
    required: [true, 'Please enter product sold price'],
    trim: true,
    maxLength: [10, 'Product sold price can not exceed 10 characters'],
    default: 0.0,
  },
  page: {
    type: Number,
    required: [true, 'Please enter product page'],
    trim: true,
    default: 0.0,
  },
  weight: {
    type: Number,
    required: [true, 'Please enter product weight'],
    trim: true,
    default: 0.0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0.0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      like: {
        type: Number,
        default: 0,
      },
      disLike: {
        type: Number,
        default: 0,
      },
      createdDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount',
    default: null,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
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
module.exports = mongoose.model('Product', productSchema);
