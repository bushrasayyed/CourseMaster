const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Ensure 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    // Use original file name with a timestamp for uniqueness
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter function to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

// Initialize multer middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
