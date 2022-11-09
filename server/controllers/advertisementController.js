const Advertisement = require('../models/advertisement');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new advertisement => api/v1/admin/advertisement/new
exports.newAdvertisement = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const advertisement = await Advertisement.create(req.body);

  res.status(201).json({
    success: true,
    advertisement,
  });
});

// Get all advertisement => /api/v1/admin/advertisements?keyword=...
exports.getAdvertisements = catchAsyncErrors(async (req, res, next) => {
  const advertisementsCount = await Advertisement.countDocuments();
  const apiFeatures = new APIFeatures(Advertisement.find(), req.query)
    .search()
    .filter();
  const advertisements = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: advertisements.length,
    advertisementsCount,
    advertisements,
  });
});

// Update advertisement => /api/v1/admin/advertisement/:id
exports.updateAdvertisement = catchAsyncErrors(async (req, res, next) => {
  let advertisement = await Advertisement.findById(req.params.id);

  if (!advertisement) {
    return next(new ErrorHandler('Advertisement is not found!', 404));
  }

  req.body.user = req.user.id;
  req.body.modifiedDate = Date.now();

  advertisement = await Advertisement.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    advertisement,
  });
});

// Delete advertisement => /api/v1/admin/advertisement/:id
exports.deleteAdvertisement = catchAsyncErrors(async (req, res, next) => {
  const advertisement = await Advertisement.findById(req.params.id);

  if (!advertisement) {
    return next(new ErrorHandler('Advertisement is not found!', 404));
  }
  await advertisement.remove();
  res.status(200).json({
    success: true,
    message: 'Advertisement is deleted!',
  });
});
