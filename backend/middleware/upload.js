// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure upload directories exist
// const uploadDirs = [
//   path.join(__dirname, '../uploads/thumbnails'),
//   path.join(__dirname, '../uploads/videos')
// ];

// uploadDirs.forEach(dir => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
// });

// // Storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (file.mimetype.startsWith('video/')) {
//       cb(null, path.join(__dirname, '../uploads/videos/'));
//     } else if (file.mimetype.startsWith('image/')) {
//       cb(null, path.join(__dirname, '../uploads/thumbnails/'));
//     } else {
//       cb(new Error('Invalid file type'), false);
//     }
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only video and image files are allowed!'), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 100 * 1024 * 1024 // 100MB limit
//   },
//   fileFilter: fileFilter
// });

// module.exports = upload;


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = [
  path.join(__dirname, '../uploads/thumbnails'),
  path.join(__dirname, '../uploads/videos'),
  path.join(__dirname, '../uploads/avatars')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Main storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('video/')) {
      cb(null, path.join(__dirname, '../uploads/videos/'));
    } else if (file.mimetype.startsWith('image/')) {
      // Check if it's avatar upload
      if (file.fieldname === 'avatar') {
        cb(null, path.join(__dirname, '../uploads/avatars/'));
      } else {
        cb(null, path.join(__dirname, '../uploads/thumbnails/'));
      }
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only video and image files are allowed!'), false);
  }
};

// ✅ FIXED: Create single upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit for general uploads
  },
  fileFilter: fileFilter
});

// ✅ FIXED: Create separate instance for avatars with smaller size limit
const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/avatars/'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for avatars
  },
  fileFilter: fileFilter
});

// ✅ FIXED: Export both as named exports
module.exports = {
  upload: upload,
  uploadAvatar: uploadAvatar
};