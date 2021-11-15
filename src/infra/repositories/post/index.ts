import { IPostRepository } from '@application/repositories/post';
import { GetAllUserPostsRepositoryResponse } from '@application/repositories/post/ports';
import { PostCreateDto } from '@domain/post/dtos';
import { prismaDB } from '@infra/database/prisma';

export class PrismaPgPostRepository implements IPostRepository {
  async getPostsByUserId(userId: string): Promise<GetAllUserPostsRepositoryResponse> {
    const posts = await prismaDB.post.findMany({
      where: { author_id: userId },
    });

    return { posts };
  }

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
