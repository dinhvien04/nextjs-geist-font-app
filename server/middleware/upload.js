const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
const avatarDir = path.join(uploadsDir, 'avatars');
const filesDir = path.join(uploadsDir, 'files');
const voiceDir = path.join(uploadsDir, 'voice');

[uploadsDir, avatarDir, filesDir, voiceDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage for different file types
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = filesDir;
    
    if (file.fieldname === 'avatar') {
      uploadPath = avatarDir;
    } else if (file.fieldname === 'audio') {
      uploadPath = voiceDir;
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Preserve original filename and add timestamp to ensure uniqueness
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'avatar') {
    // Allow only images for avatars
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed for avatars!'), false);
    }
  } else if (file.fieldname === 'audio') {
    // Allow only audio files for voice messages
    if (!file.mimetype.startsWith('audio/')) {
      return cb(new Error('Only audio files are allowed for voice messages!'), false);
    }
  } else {
    // For general files, allow common file types
    const allowedMimes = [
      'image/', 'audio/', 'video/',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];

    if (!allowedMimes.some(type => file.mimetype.startsWith(type))) {
      return cb(new Error('File type not allowed!'), false);
    }
  }
  cb(null, true);
};

// Create multer instances
const uploadAvatar = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for avatars
  }
});

const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit for general files
  }
});

// Middleware to process uploaded images
const processImage = async (req, res, next) => {
  if (!req.file || !req.file.mimetype.startsWith('image/')) {
    return next();
  }

  try {
    // Resize and compress image
    const processedImagePath = path.join(
      path.dirname(req.file.path),
      'processed-' + path.basename(req.file.path)
    );

    await sharp(req.file.path)
      .resize(800, 800, { // Max dimensions
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 }) // Compress to JPEG
      .toFile(processedImagePath);

    // Replace original file with processed one
    fs.unlinkSync(req.file.path);
    fs.renameSync(processedImagePath, req.file.path);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadAvatar,
  uploadFile,
  processImage
};
