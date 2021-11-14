import { PostUseCases } from '@application/use-cases/post';
import { CreatePostController } from '@infra/presentation/controllers/post/createPostController';
import { PrismaPgPostRepository } from '@infra/repositories/post';
import { Request, Response } from 'express';

const postRepository = new PrismaPgPostRepository();
const postUseCases = new PostUseCases(postRepository);

export async function makeCreatePostController(req: Request, res: Response) {
  const controller = new CreatePostController(postUseCases);
  return await controller.handle(req, res);
}
