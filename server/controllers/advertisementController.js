const Advertisement = require('../models/advertisement');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

// Create new advertisement => api/v1/admin/advertisement/new
exports.newAdvertisement = catchAsyncErrors(async (req, res, next) => {
  const user = req.user.id;
  const { name, description, image } = req.body;

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: 'advertisements',
    width: 150,
    crop: 'scale',
  });

  const advertisement = await Advertisement.create({
    name,
    description,
    user,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

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

// Get all advertisement pagination => /api/v1/admin/advertisements/:resPerPage?keyword=...
exports.getAdvertisementsPagination = catchAsyncErrors(
  async (req, res, next) => {
    let resPerPage = req.params.resPerPage;
    const advertisementsCount = await Advertisement.countDocuments();
    const apiFeatures = new APIFeatures(Advertisement.find(), req.query)
      .search()
      .filter();
    let advertisements = await apiFeatures.query;
    let filteredAdvertisementsCount = advertisements.length;
    apiFeatures.sorting().pagination(resPerPage);
    advertisements = await apiFeatures.query.clone();

    res.status(200).json({
      success: true,
      filteredAdvertisementsCount,
      advertisementsCount,
      advertisements,
    });
  }
);

// Update advertisement => /api/v1/admin/advertisement/:id
exports.updateAdvertisement = catchAsyncErrors(async (req, res, next) => {
  const newAdvertisementData = {
    name: req.body.name,
    user: req.user.id,
    description: req.body.description,
    modifiedDate: Date.now(),
  };
  let advertisement = await Advertisement.findById(req.params.id);

  if (!advertisement) {
    return next(new ErrorHandler('Advertisement is not found!', 404));
  }

  const deleteImage = await cloudinary.v2.uploader.destroy(
    advertisement.image.public_id
  );

  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: 'advertisements',
    width: 150,
    crop: 'scale',
  });

  newAdvertisementData.image = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  advertisement = await Advertisement.findByIdAndUpdate(
    req.params.id,
    newAdvertisementData,
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
