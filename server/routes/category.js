const express = require('express');
const router = express.Router();

const {
  newCategory,
  getCategoriesAdmin,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoriesPagination,
} = require('../controllers/categoryController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router
  .route('/admin/category/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newCategory);
router.route('/categories/:resPerPage').get(getCategoriesPagination);
router.route('/categories').get(getCategories);
router
  .route('/admin/category/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory);
router
  .route('/admin/category/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

module.exports = router;
