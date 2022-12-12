const Discount = require('../models/discount');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new discount => api/v1/admin/discount/new
exports.newDiscount = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const discount = await Discount.create(req.body);

  res.status(201).json({
    success: true,
    discount,
  });
});

// Get all discount => /api/v1/admin/discounts?keyword=...
exports.getDiscounts = catchAsyncErrors(async (req, res, next) => {
  const discountsCount = await Discount.countDocuments();
  const apiFeatures = new APIFeatures(Discount.find(), req.query)
    .search()
    .filter();
  const discounts = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: discounts.length,
    discountsCount,
    discounts,
  });
});

// Get all discount pagination=> /api/v1/admin/discounts/:resPerPage?keyword=...
exports.getDiscountsPagination = catchAsyncErrors(async (req, res, next) => {
  let resPerPage = req.params.resPerPage;
  const discountsCount = await Discount.countDocuments();
  const apiFeatures = new APIFeatures(Discount.find(), req.query)
    .search()
    .filter();
  let discounts = await apiFeatures.query;
  let filteredDiscountsCount = discounts.length;
  apiFeatures.sorting().pagination(resPerPage);
  discounts = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    filteredDiscountsCount,
    discountsCount,
    discounts,
  });
});

// Update discount => /api/v1/admin/discount/:id
exports.updateDiscount = catchAsyncErrors(async (req, res, next) => {
  let discount = await Discount.findById(req.params.id);

  if (!discount) {
    return next(new ErrorHandler('Discount is not found!', 404));
  }

  req.body.user = req.user.id;
  req.body.modifiedDate = Date.now();

  discount = await Discount.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    discount,
  });
});

// Delete discount => /api/v1/admin/discount/:id
exports.deleteDiscount = catchAsyncErrors(async (req, res, next) => {
  // const products = Product.find(
  //   (pro) => pro.discount.toString() === req.params.id.toString()
  // );

  // if (products) {
  //   return next(new ErrorHandler('Discount can not deleted!', 404));
  // }

  const discount = await Discount.findById(req.params.id);

  if (!discount) {
    return next(new ErrorHandler('Discount is not found!', 404));
  }
  await discount.remove();
  res.status(200).json({
    success: true,
    message: 'Discount is deleted!',
  });
});
