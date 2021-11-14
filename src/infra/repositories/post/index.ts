import { IPostRepository } from '@application/repositories/post';
import { PostCreateDto } from '@domain/post/dtos';
import { prismaDB } from '@infra/database/prisma';

export class PrismaPgPostRepository implements IPostRepository {
  async createPost(data: PostCreateDto): Promise<{ id: string }> {
    const post = await prismaDB.post.create({
      data: {
        content: data.content,
        author_id: data.authorId,
      },
      select: { id: true },
    });

    return post;
  }
}
