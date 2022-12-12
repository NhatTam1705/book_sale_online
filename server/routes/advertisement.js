const express = require('express');
const router = express.Router();

const {
  newAdvertisement,
  getAdvertisements,
  updateAdvertisement,
  deleteAdvertisement,
  getAdvertisementsPagination,
} = require('../controllers/advertisementController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router
  .route('/admin/advertisement/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newAdvertisement);
router.route('/advertisements').get(getAdvertisements);
router
  .route('/admin/advertisements/:resPerPage')
  .get(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    getAdvertisementsPagination
  );
router
  .route('/admin/advertisement/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateAdvertisement);
router
  .route('/admin/advertisement/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAdvertisement);

module.exports = router;
