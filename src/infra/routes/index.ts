import { Router } from 'express';
import { postRoutes } from './post';
import { userRoutes } from './user';

export const routes = Router();

routes.use('/user', userRoutes);
routes.use('/post', postRoutes);
