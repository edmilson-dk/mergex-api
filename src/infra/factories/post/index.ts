import { PostUseCases } from '@application/use-cases/post';
import { CreatePostController } from '@infra/presentation/controllers/post/createPostController';
import { GetAllUserPostsController } from '@infra/presentation/controllers/post/getAllUserPostsContoller';
import { PrismaPgPostRepository } from '@infra/repositories/post';
import { Request, Response } from 'express';

const postRepository = new PrismaPgPostRepository();
const postUseCases = new PostUseCases(postRepository);

export async function makeCreatePostController(req: Request, res: Response) {
  const controller = new CreatePostController(postUseCases);
  return await controller.handle(req, res);
}

export async function makeGetAllUserPostsController(req: Request, res: Response) {
  const controller = new GetAllUserPostsController(postUseCases);
  return await controller.handle(req, res);
}
