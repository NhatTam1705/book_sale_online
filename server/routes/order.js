const express = require('express');
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
  getAllOrderUserPagination,
  getAllOrderPagination,
} = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router
  .route('/orders/:id/:resPerPage')
  .get(isAuthenticatedUser, getAllOrderUserPagination);
router;
router
  .route('/admin/orders/:resPerPage')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrderPagination);
router
  .route('/admin/orders/')
  .get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder);
router
  .route('/admin/order/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = router;
