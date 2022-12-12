const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeature = require('../utils/apiFeatures');

//create a nre order => api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paymentMethod,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentInfo: paymentMethod === 'Direct bank transfer' ? paymentInfo : null,
    paymentMethod,
    paidAt: paymentMethod === 'Direct bank transfer' ? Date.now() : null,
    user: req.user._id,
  });

  orderItems.forEach(async (item) => {
    const product = await Product.findById(item.product);
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get single order  => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('No order found with this ID!', 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get logged in user orrder  => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all order in user  => /api/v1/orders/:id/:resPerPage
exports.getAllOrderUserPagination = catchAsyncErrors(async (req, res, next) => {
  let resPerPage = req.params.resPerPage;
  const apiFeatures = new APIFeature(
    Order.find({ user: req.params.id }),
    req.query
  )
    .sorting()
    .pagination(resPerPage);
  const orders = await apiFeatures.query;

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all order pagination  => /api/v1/admin/orders/:resPerPage
exports.getAllOrderPagination = catchAsyncErrors(async (req, res, next) => {
  let resPerPage = req.params.resPerPage;
  const ordersCount = await Order.countDocuments();
  const apiFeatures = new APIFeature(Order.find(), req.query).search().filter();
  let orders = await apiFeatures.query;
  let filteredOrdersCount = orders.length;
  apiFeatures.sorting().pagination(resPerPage);
  orders = await apiFeatures.query.clone();
  for await (let order of orders) {
    order.user = await User.findById(order.user);
  }

  res.status(200).json({
    success: true,
    filteredOrdersCount,
    ordersCount,
    orders,
  });
});

//Get all orrder  => /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update/ Process order - admin => /api/v1/admin/orders/
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus == 'Completed') {
    return next(new ErrorHandler('You have already completed this order!'));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  (order.orderStatus = req.body.status), (order.deliveredDate = Date.now());

  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  if (product) {
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
  }

  //   if (product.stock < 0) {
  //     return next(
  //       new ErrorHandler(`${product.name} Vuot qua so luong sach trong kho`)
  //     );
  //   }
}

//Delete  order  => /api/v1/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('No order found with this ID!', 404));
  }

  order.orderItems.forEach(async (item) => {
    const product = await Product.findById(item.product);
    product.stock = product.stock + item.quantity;
    await product.save({ validateBeforeSave: false });
  });
  await order.remove();

  res.status(200).json({
    success: true,
  });
});
