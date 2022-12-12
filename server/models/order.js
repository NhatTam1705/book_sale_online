const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  shippingInfo: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      format: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },
  itemsPrice: {
    //tổng giá của một sp x số lượng => 1 táp = 3$ x 3 trái = 9$ (itemsPrice)
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Processing',
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: {
      values: ['Cash on delivery', 'Direct bank transfer'],
      message: 'Please select correct payment method for order ',
    },
  },
  deliveredDate: {
    type: Date,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
