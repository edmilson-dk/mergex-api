import { Router } from 'express';
import multer from 'multer';

import {
  makeAuthUserByEmailController,
  makeAuthUserByGithubController,
  makeCreateUserController,
  makeUpdateUserAvatarController,
  makeUpdateUserBannerController,
  makeUpdateUserProfileController,
} from '@infra/factories/user';
import { authUserJwtMiddleware } from '../middlewares/auth-middlewares';
import { multerImageUploadConfig } from '@shared/multer';

export const userRoutes = Router();
const multerImageUpload = multer(multerImageUploadConfig);

userRoutes.post('/register', makeCreateUserController);
userRoutes.post('/login/github', makeAuthUserByGithubController);
userRoutes.post('/login/email', makeAuthUserByEmailController);
userRoutes.put('/profile', authUserJwtMiddleware, makeUpdateUserProfileController);
userRoutes.put(
  '/profile/avatar',
  multerImageUpload.single('image'),
  authUserJwtMiddleware,
  makeUpdateUserAvatarController,
);
userRoutes.put(
  '/profile/banner',
  multerImageUpload.single('image'),
  authUserJwtMiddleware,
  makeUpdateUserBannerController,
);
