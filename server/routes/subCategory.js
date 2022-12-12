const express = require('express');
const router = express.Router();

const {
  newSubCategory,
  getSubCategoriesPagination,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} = require('../controllers/subCategoryController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router
  .route('/admin/subCategory/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newSubCategory);
router.route('/subCategories/:resPerPage').get(getSubCategoriesPagination);
router.route('/subCategories').get(getSubCategories);
router
  .route('/admin/subCategory/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateSubCategory);
router
  .route('/admin/subCategory/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSubCategory);

module.exports = router;
