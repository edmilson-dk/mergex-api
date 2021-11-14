import { makeCreatePostController } from '@infra/factories/post';
import { Router } from 'express';
import { authUserJwtMiddleware } from '../middlewares/auth-middlewares';

export const postRoutes = Router();

postRoutes.post('/create', authUserJwtMiddleware, makeCreatePostController);
