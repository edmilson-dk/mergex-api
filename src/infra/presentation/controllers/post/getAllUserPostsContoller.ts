import { Request, Response } from 'express';

import { IPostUseCases } from '@domain/post/use-cases';

export class GetAllUserPostsController {
  private readonly postUseCases: IPostUseCases;

  constructor(postUseCases: IPostUseCases) {
    this.postUseCases = postUseCases;
  }

  public async handle(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).send({ message: 'User id is required' });
      }

      const posts = await this.postUseCases.getAllUserPosts(userId);

      return res.status(200).send({
        posts: posts.value.posts,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}
