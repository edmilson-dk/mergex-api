import { Router } from 'express';

import {
  makeAuthUserByEmailController,
  makeAuthUserByGithubController,
  makeCreateUserController,
} from '@infra/factories/user';

export const userRoutes = Router();

userRoutes.post('/register', makeCreateUserController);
userRoutes.post('/login/github', makeAuthUserByGithubController);
userRoutes.post('/login/email', makeAuthUserByEmailController);
