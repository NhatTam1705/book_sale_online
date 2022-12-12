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

// Get all categories pagination => /api/v1/categories/:resPerPage&keyword=...
exports.getCategoriesPagination = catchAsyncErrors(async (req, res, next) => {
  let resPerPage = req.params.resPerPage;

  const categoriesCount = await Category.countDocuments();
  const apiFeatures = new APIFeatures(Category.find(), req.query)
    .search()
    .filter();
  let categories = await apiFeatures.query;
  let filteredCategoriesCount = categories.length;
  apiFeatures.sorting().pagination(resPerPage);
  categories = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    filteredCategoriesCount,
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
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler('Category is not found!', 404));
  }
  const subCategories = await SubCategory.find();
  const categoryExist = subCategories.filter(
    (sub) => sub.category.toString() === req.params.id.toString()
  );
  if (categoryExist.length !== 0) {
    return next(new ErrorHandler('Category can not delete!', 404));
  }
  await category.remove();
  res.status(200).json({
    success: true,
    message: 'Category is deleted!',
  });
});
