const Product = require('../models/product');
const Author = require('../models/author');
const Discount = require('../models/discount');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

// Create new product => api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  req.body.stockInput = req.body.stock;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products => /api/v1/products?keyword = apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const productsCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    productsCount,
    products,
  });
});

// Get all products => /api/v1/products/:resPerPage?keyword = apple
exports.getProductsPagination = catchAsyncErrors(async (req, res, next) => {
  let resPerPage = req.params.resPerPage;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;
  apiFeatures.sorting().pagination(resPerPage);
  products = await apiFeatures.query.clone();
  for await (let product of products) {
    product.author = await Author.findById(product.author);
    if (product.discount) {
      product.discount = await Discount.findById(product.discount);
    }
  }
  res.status(200).json({
    success: true,
    filteredProductsCount,
    productsCount,
    products,
  });
});

//Get single product detail => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product is not found!', 404));
  }
  product.author = await Author.findById(product.author);
  if (product.discount) {
    product.discount = await Discount.findById(product.discount);
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Update product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('KHÔNG CÓ ID NÀY MÁ ƠI!', 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Deleting images associated with the product
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: 'Product is deleted!',
  });
});

//Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res) => {
  const { rating, title, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    title,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.title = title;
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Get Product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete Product Reviews => /api/v1/reviews
exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  const numOfReviews = reviews.length;
  const ratings =
    reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});

// Get review star for each product =?/api/v1/review/:id
exports.getSingleReviewProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  let review = [];
  if (!product) {
    return next(new ErrorHandler('Can not found this ID', 404));
  }
  for (let i = 1; i <= 5; i++) {
    const reviewOfStar = product.reviews.filter((re) => re.rating === i);
    review[i - 1] = { star: i, total: reviewOfStar.length };
  }

  res.status(200).json({
    return: true,
    review,
  });
});
