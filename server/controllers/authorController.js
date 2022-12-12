const Author = require('../models/author');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const Product = require('../models/product');
const cloudinary = require('cloudinary');

// Create new author => api/v1/admin/author/new
exports.newAuthor = catchAsyncErrors(async (req, res, next) => {
  const user = req.user.id;
  const { name, introduce, avatar } = req.body;

  const result = await cloudinary.v2.uploader.upload(avatar, {
    folder: 'authors',
    width: 150,
    crop: 'scale',
  });

  const author = await Author.create({
    name,
    introduce,
    user,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    author,
  });
});

// Get all authors => /api/v1//authors  20 authors/page
exports.getAuthors = catchAsyncErrors(async (req, res, next) => {
  const authorsCount = await Author.countDocuments();
  const apiFeatures = new APIFeatures(Author.find(), req.query)
    .search()
    .filter();
  const authors = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: authors.length,
    authorsCount,
    authors,
  });
});
// Get all authors pagination => /api/v1/authors/:resPerPage  20 authors/page
exports.getAuthorsPagination = catchAsyncErrors(async (req, res, next) => {
  let resPerPage = req.params.resPerPage;
  const authorsCount = await Author.countDocuments();
  const apiFeatures = new APIFeatures(Author.find(), req.query)
    .search()
    .filter();
  let authors = await apiFeatures.query;
  let filteredAuthorsCount = authors.length;
  apiFeatures.sorting().pagination(resPerPage);
  authors = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    filteredAuthorsCount,
    authorsCount,
    authors,
  });
});

// Get single author => /api/v1/author/:id
exports.getAuthorDetails = catchAsyncErrors(async (req, res, next) => {
  const author = await Author.findById(req.params.id);

  if (!author) {
    return next(new ErrorHandler('Author is not found!', 404));
  }

  res.status(200).json({
    success: true,
    author,
  });
});

//Update author => /api/v1/admin/author/:id
exports.updateAuthor = catchAsyncErrors(async (req, res, next) => {
  let author = await Author.findById(req.params.id);

  if (!author) {
    return next(new ErrorHandler('Author is not found!', 404));
  }

  req.body.user = req.user.id;
  req.body.modifiedDate = Date.now();

  author = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    author,
  });
});

// Delete Author - admin => /api/v1/admin/author/:id
exports.deleteAuthor = catchAsyncErrors(async (req, res, next) => {
  const author = await Author.findById(req.params.id);
  if (!author) {
    return next(new ErrorHandler('Author is not found!', 404));
  }
  const products = await Product.find();
  const authorExist = products.filter((pro) => pro.author == req.params.id);
  if (authorExist.length !== 0) {
    return next(new ErrorHandler('Author can not deleted!', 404));
  }
  const result = await cloudinary.v2.uploader.destroy(author.avatar.public_id);

  await author.remove();
  res.status(200).json({
    success: true,
    message: 'Author is deleted!',
  });
});
