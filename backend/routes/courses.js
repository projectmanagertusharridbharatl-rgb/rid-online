// const express = require('express');
// const {
//   getCourses,
//   getCourse,
//   createCourse,
//   updateCourse,
//   deleteCourse,
//   enrollCourse
// } = require('../controllers/courseController');

// const { protect, authorize } = require('../middleware/auth');
// const upload = require('../middleware/upload');

// const router = express.Router();

// router
//   .route('/')
//   .get(getCourses)
//   .post(protect, authorize('instructor', 'admin'), upload.single('thumbnail'), createCourse);

// router
//   .route('/:id')
//   .get(getCourse)
//   .put(protect, authorize('instructor', 'admin'), updateCourse)
//   .delete(protect, authorize('instructor', 'admin'), deleteCourse);

// router
//   .route('/:id/enroll')
//   .post(protect, enrollCourse);



  

// module.exports = router;










const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse
} = require('../controllers/courseController');

const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload'); // ✅ FIXED: Import upload correctly

const router = express.Router();

router
  .route('/')
  .get(getCourses)
  .post(protect, authorize('instructor', 'admin'), upload.single('thumbnail'), createCourse); // ✅ FIXED: Now upload.single will work

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('instructor', 'admin'), updateCourse)
  .delete(protect, authorize('instructor', 'admin'), deleteCourse);

router
  .route('/:id/enroll')
  .post(protect, enrollCourse);

// Video routes for a course
router.use('/:courseId/videos', require('./videos'));

module.exports = router;

