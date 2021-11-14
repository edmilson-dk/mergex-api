import { Request, Response } from 'express';

import { IPostUseCases } from '@domain/post/use-cases';

export class CreatePostController {
  private readonly postUseCases: IPostUseCases;

  constructor(postUseCases: IPostUseCases) {
    this.postUseCases = postUseCases;
  }

  public async handle(req: Request, res: Response) {
    try {
      const { content } = req.body;
      const authorId = req.userId;

      if (!content) {
        return res.status(400).send({ message: 'post content is required' });
      }

      const postOrError = await this.postUseCases.createPost({
        authorId,
        content,
      });

      if (postOrError.isLeft()) {
        return res.status(400).send({ message: postOrError.value.message });
      }

      return res.status(201).send({
        message: 'post created',
        postId: postOrError.value.id,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}
