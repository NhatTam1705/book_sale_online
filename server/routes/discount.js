const express = require('express');
const router = express.Router();

const {
  newDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
} = require('../controllers/discountController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router
  .route('/admin/discount/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newDiscount);
router
  .route('/admin/discounts')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getDiscounts);
router
  .route('/admin/discount/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateDiscount);
router
  .route('/admin/discount/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteDiscount);

module.exports = router;
