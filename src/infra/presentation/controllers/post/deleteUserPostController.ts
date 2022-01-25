import { Request, Response } from 'express';

import { IPostUseCases } from '@domain/post/use-cases';

export class DeleteUserPostController {
  private readonly postUseCases: IPostUseCases;

  constructor(postUseCases: IPostUseCases) {
    this.postUseCases = postUseCases;
  }

  public async handle(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const postId = req.params.id;

      if (!postId) {
        return res.status(400).send({ message: 'Post id is required' });
      }

      const deletedId = await this.postUseCases.deleteUserPost(postId, userId);

      return res.status(200).send({ id: deletedId });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}
