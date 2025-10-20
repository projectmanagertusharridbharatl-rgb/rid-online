// const express = require('express');
// const {
//   getVideos,
//   getVideo,
//   createVideo,
//   updateVideo,
//   deleteVideo
// } = require('../controllers/videoController');

// const { protect, authorize } = require('../middleware/auth');
// const upload = require('../middleware/upload');

// const router = express.Router({ mergeParams: true });

// router
//   .route('/')
//   .get(getVideos)
//   .post(protect, authorize('instructor', 'admin'), upload.single('video'), createVideo);

// router
//   .route('/:id')
//   .get(getVideo)
//   .put(protect, authorize('instructor', 'admin'), updateVideo)
//   .delete(protect, authorize('instructor', 'admin'), deleteVideo);

// module.exports = router;










const express = require('express');
const {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo
} = require('../controllers/videoController');

const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload'); // ✅ FIXED: Import upload correctly

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getVideos)
  .post(protect, authorize('instructor', 'admin'), upload.single('video'), createVideo); // ✅ FIXED: Now upload.single will work

router
  .route('/:id')
  .get(getVideo)
  .put(protect, authorize('instructor', 'admin'), updateVideo)
  .delete(protect, authorize('instructor', 'admin'), deleteVideo);

module.exports = router;