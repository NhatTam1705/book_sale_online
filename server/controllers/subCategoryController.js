const SubCategory = require('../models/subCategory');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new sub category => api/v1/admin/subCategory/new
exports.newSubCategory = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const subCategory = await SubCategory.create(req.body);

  res.status(201).json({
    success: true,
    subCategory,
  });
});

// Get all sub categories for admin => /api/v1/admin/subCategories/:resPerPage&keyword=...
exports.getSubCategoriesAdmin = catchAsyncErrors(async (req, res, next) => {
  let resPerPage = req.params.resPerPage;

  const subCategoriesCount = await SubCategory.countDocuments();
  const apiFeatures = new APIFeatures(SubCategory.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const subCategories = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: subCategories.length,
    subCategoriesCount,
    subCategories,
  });
});

// Get all sub categories => /api/v1/subCategories?keyword=...
exports.getSubCategories = catchAsyncErrors(async (req, res, next) => {
  const subCategoriesCount = await SubCategory.countDocuments();
  const apiFeatures = new APIFeatures(SubCategory.find(), req.query)
    .search()
    .filter();
  const subCategories = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: subCategories.length,
    subCategoriesCount,
    subCategories,
  });
});

// Update sub category => /api/v1/admin/subCategory/:id
exports.updateSubCategory = catchAsyncErrors(async (req, res, next) => {
  let subCategory = await SubCategory.findById(req.params.id);

  if (!subCategory) {
    return next(new ErrorHandler('Sub category is not found!', 404));
  }

  req.body.user = req.user.id;
  req.body.modifiedDate = Date.now();

  subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    subCategory,
  });
});

// Delete sub category => /api/v1/admin/subCategory/:id
exports.deleteSubCategory = catchAsyncErrors(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id);
  if (!subCategory) {
    return res.status(404).json({
      success: false,
      message: 'Sub category is not found!',
    });
  }
  await subCategory.remove();
  res.status(200).json({
    success: true,
    message: 'Sub category is deleted!',
  });
});
