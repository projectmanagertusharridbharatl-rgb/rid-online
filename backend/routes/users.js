const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getEnrolledCourses,
  getMyCourses
} = require('../controllers/userController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/enrolled-courses', getEnrolledCourses);
router.get('/my-courses', authorize('instructor', 'admin'), getMyCourses);

module.exports = router;



// const express = require('express');
// const {
//   getUserProfile,
//   updateUserProfile,
//   getEnrolledCourses,
//   getMyCourses
// } = require('../controllers/userController');

// const { protect, authorize } = require('../middleware/auth');
// const { uploadAvatar } = require('../middleware/upload'); // ✅ FIXED: Import uploadAvatar correctly

// const router = express.Router();

// router.use(protect);

// router.get('/profile', getUserProfile);
// router.put('/profile', uploadAvatar.single('avatar'), updateUserProfile); // ✅ FIXED: Use uploadAvatar.single
// router.get('/enrolled-courses', getEnrolledCourses);
// router.get('/my-courses', authorize('instructor', 'admin'), getMyCourses);

// module.exports = router;