import path from 'path';
import multer from 'multer';

import { generateUUID } from '@shared/utils';

export const multerImageUploadConfig = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'images'),
    filename: (req, file, callback) => {
      const fileHash = generateUUID();
      const fileName = `${fileHash}-${file.originalname.split(' ').join('')}`;
      return callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      return callback(null, true);
    }
    return callback(new Error('Invalid image file type.'));
  },
} as multer.Options;
