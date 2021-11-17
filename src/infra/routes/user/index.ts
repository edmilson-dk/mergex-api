import { Router } from 'express';

import {
  makeAuthUserByEmailController,
  makeAuthUserByGithubController,
  makeCreateUserController,
  makeUpdateUserProfileController,
} from '@infra/factories/user';
import { authUserJwtMiddleware } from '../middlewares/auth-middlewares';

export const userRoutes = Router();

userRoutes.post('/register', makeCreateUserController);
userRoutes.post('/login/github', makeAuthUserByGithubController);
userRoutes.post('/login/email', makeAuthUserByEmailController);
userRoutes.put('/profile', authUserJwtMiddleware, makeUpdateUserProfileController);
