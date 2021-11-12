import { Router } from 'express';

import { makeCreateUserController } from '@infra/factories/user';

export const userRoutes = Router();

userRoutes.post('/authenticate', makeCreateUserController);
