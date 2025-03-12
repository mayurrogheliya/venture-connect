import multer from 'multer';
import path from 'path';
import { errorResponse } from '../utils/responseFormatter.js';
import fs from 'fs-extra';

const tempDir = './public/temp';
fs.ensureDirSync(tempDir);

const StartupfieldSizeLimits = {
  startupLogo: 5 * 1024 * 1024, // 5MB
  founderImage: 2 * 1024 * 1024, // 2MB
  teamMembersImages: 2 * 1024 * 1024, // 2MB
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const startupFileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, JPG and PNG files are allowed.'), false);
  }

  const fieldLimit = StartupfieldSizeLimits[file.fieldname];
  if (file.size > fieldLimit) {
    return cb(
      new Error(
        `${file.fieldname} size must be below ${fieldLimit / (1024 * 1024)}MB`,
      ),
      false,
    );
  }
  cb(null, true);
};

const startupUpload = multer({
  storage,
  fileFilter: startupFileFilter,
}).fields([
  { name: 'startupLogo', maxCount: 1 },
  { name: 'founderImage', maxCount: 1 },
  { name: 'teamMembersImages', maxCount: 3 },
]);

export const StartupUploadMiddleware = (req, res, next) => {
  startupUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return errorResponse(res, `Multer error: ${err.message}`, 400);
    } else if (err) {
      return errorResponse(
        res,
        `Error during file upload: ${err.message}`,
        400,
      );
    }
    next();
  });
};

const EventFileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, JPG and PNG files are allowed.'), false);
  }

  cb(null, true);
};

const EventUpload = multer({
  storage,
  fileFilter: EventFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('event_url');

export const EventUploadMiddleware = (req, res, next) => {
  EventUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return errorResponse(res, `Multer error: ${err.message}`, 400);
    } else if (err) {
      return errorResponse(
        res,
        `Error during file upload: ${err.message}`,
        400,
      );
    }

    // Check if file exists before proceeding
    if (!req.file) {
      return errorResponse(res, 'Event image is required', 400);
    }
    next();
  });
};

const InvestorFileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, JPG and PNG files are allowed.'), false);
  }

  cb(null, true);
};

const InvestorUpload = multer({
  storage,
  fileFilter: InvestorFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('investor_image');

export const investorUploadMiddleware = (req, res, next) => {
  InvestorUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return errorResponse(res, `Multer error: ${err.message}`, 400);
    } else if (err) {
      return errorResponse(
        res,
        `Error during file upload: ${err.message}`,
        400,
      );
    }
    next();
  });
};
