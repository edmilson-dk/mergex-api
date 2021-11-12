import { Router } from 'express';
import { userRoutes } from './user';

export const routes = Router();

routes.use('/user', userRoutes);
