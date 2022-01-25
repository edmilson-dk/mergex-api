import { Router } from 'express';

import {
  makeCreatePostController,
  makeGetAllUserPostsController,
  makeDeleteUserPostController,
} from '@infra/factories/post';
import { authUserJwtMiddleware } from '../middlewares/auth-middlewares';

export const postRoutes = Router();

postRoutes.post('/create', authUserJwtMiddleware, makeCreatePostController);
postRoutes.get('/all/:id', authUserJwtMiddleware, makeGetAllUserPostsController);
postRoutes.delete('/delete/:id', authUserJwtMiddleware, makeDeleteUserPostController);
