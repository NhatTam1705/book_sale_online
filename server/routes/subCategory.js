const express = require('express');
const router = express.Router();

const {
  newSubCategory,
  getSubCategoriesAdmin,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} = require('../controllers/subCategoryController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router
  .route('/admin/subCategory/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newSubCategory);
router
  .route('/admin/subCategories/:resPerPage')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSubCategoriesAdmin);
router.route('/subCategories').get(getSubCategories);
router
  .route('/admin/subCategory/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateSubCategory);
router
  .route('/admin/subCategory/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSubCategory);

module.exports = router;
