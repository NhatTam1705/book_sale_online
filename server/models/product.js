const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name can not exceed 100 characters"],
  },
  category: {
    type: String,
    required: [true, "Please select category for this product!"],
    enum: {
      values: ["English Book", "Vietnamese Book"],
      message: "Please select conrect category for this product",
    },
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    trim: true,
    maxLength: [10, "Product name can not exceed 5 characters"],
    default: 0.0,
  },
  ratings: {
    type: Number,
    default: 0.0,
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    default: 0.0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
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
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Product", productSchema);
