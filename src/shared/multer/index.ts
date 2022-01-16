import multer from 'multer';

import { generateUUID } from '@shared/utils';
import { ENVS } from '@main/config/constants';

export const multerImageUploadConfig = {
  storage: multer.diskStorage({
    destination: ENVS.IMAGE_UPLOAD_PATH,
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
