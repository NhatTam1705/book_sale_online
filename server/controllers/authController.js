const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const users = await User.find();
  const emailExist = users.filter((user) => user.email === email);
  if (emailExist.length > 0) {
    return next(new ErrorHandler('Email has been existed!', 404));
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler('Password and confirm password does not match!', 404)
    );
  }

  // const result = await cloudinary.v2.uploader.upload(avatar, {
  //   folder: 'avatars',
  //   width: 150,
  //   crop: 'scale',
  // });

  const user = await User.create({
    name,
    email,
    password,
    // avatar: {
    //   public_id: result.public_id,
    //   url: result.secure_url,
    // },
  });

  sendToken(user, 200, res);
  // return next(new ErrorHandler('Please enter email & password', 400));
});

//Login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email passord is entered by user
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400));
  }

  //Finding user in database
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password!', 401));
  }
  //checks if password correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  sendToken(user, 200, res);
});

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found with this email!', 404));
  }
  //Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your passsword reset token is as follow:\n\n${resetUrl}\n\n If you have not requested this email, then ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'BookSaleOnline password recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password => /api/v1/password/forgot
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //hash URL token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'Password reset token is invalid or has been expires',
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  //setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//Get currently logged in user detail => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  if (req.body.password !== req.body.comfirmPassword) {
    new ErrorHandler('Password and confirm password does not match!', 404);
  }
  const user = await User.findById(req.user.id).select('+password');

  //check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

//Update user profile => /api/v1/me/update

exports.updateProfile = catchAsyncErrors(async (req, res, nex) => {
  const newUserData = {
    name: req.body.name,
    gender: req.body.gender,
    birthday: req.body.birthday,
    phone: req.body.phone,
    modifiedDate: Date.now(),
  };

  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);
    if (user.avatar.public_id) {
      let image_id = user.avatar.public_id;
      const res = await cloudinary.v2.uploader.destroy(image_id);
    }

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//logout user => api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: ' Logged out',
  });
});

//Admin Routes

//Get all users pagination => /api/v1/admin/users/:resPerPage
exports.allUsersPagination = catchAsyncErrors(async (req, res, next) => {
  let resPerPage = req.params.resPerPage;
  const usersCount = await User.countDocuments();
  const apiFeatures = new APIFeatures(User.find(), req.query).search().filter();
  let users = await apiFeatures.query;
  let filteredUsersCount = users.length;
  apiFeatures.sorting().pagination(resPerPage);
  users = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    filteredUsersCount,
    usersCount,
    users,
  });
});
//Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const usersCount = await User.countDocuments();
  const apiFeatures = new APIFeatures(User.find(), req.query)
    .search()
    .filter()
    .sorting();
  const users = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    count: users.length,
    usersCount,
    users,
  });
});

//Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with this id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, nex) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete user details => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with this id: ${req.params.id}`)
    );
  }
  //remove avatar from ggdrive

  await user.remove();
  res.status(200).json({
    success: true,
  });
});
