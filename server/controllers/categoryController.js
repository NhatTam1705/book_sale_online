const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new category => api/v1/admin/category/new
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

// Get all categories for admin => /api/v1/admin/categories/:resPerPage&keyword=...
exports.getCategoriesAdmin = catchAsyncErrors(async (req, res, next) => {
  let resPerPage = req.params.resPerPage;

  const categoriesCount = await Category.countDocuments();
  const apiFeatures = new APIFeatures(Category.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const categories = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: categories.length,
    categoriesCount,
    categories,
  });
});

// Get all categories => /api/v1/categories?keyword=...
exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  const categoriesCount = await Category.countDocuments();
  const apiFeatures = new APIFeatures(Category.find(), req.query)
    .search()
    .filter();
  const categories = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: categories.length,
    categoriesCount,
    categories,
  });
});

// Update category => /api/v1/admin/category/:id
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category is not found!', 404));
  }

  req.body.user = req.user.id;
  req.body.modifiedDate = Date.now();

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    category,
  });
});

// Delete category => /api/v1/admin/category/:id
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const subCategories = SubCategory.find(
    (sub) => sub.category.toString() === req.params.id.toString()
  );
  if (subCategories) {
    return next(new ErrorHandler('Category can not deleted!', 404));
  }

  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category is not found!', 404));
  }
  await category.remove();
  res.status(200).json({
    success: true,
    message: 'Category is deleted!',
  });
});
