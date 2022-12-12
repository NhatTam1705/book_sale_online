const express = require('express');
const router = express.Router();

const {
  newAuthor,
  getAuthors,
  getAuthorsPagination,
  getAuthorDetails,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router
  .route('/admin/author/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newAuthor);

router.route('/authors').get(getAuthors);
router.route('/author/:id').get(getAuthorDetails);

router.route('/authors/:resPerPage').get(getAuthorsPagination);

router
  .route('/admin/author/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateAuthor);

router
  .route('/admin/author/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAuthor);

module.exports = router;
