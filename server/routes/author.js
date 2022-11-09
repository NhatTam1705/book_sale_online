const express = require('express');
const router = express.Router();

const {
  newAuthor,
  getAuthors,
  getAuthorsAdmin,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router
  .route('/admin/author/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newAuthor);

router.route('/authors/').get(getAuthors);

router
  .route('/admin/authors/:resPerPage')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAuthorsAdmin);

router
  .route('/admin/author/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateAuthor);

router
  .route('/admin/author/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAuthor);

module.exports = router;
