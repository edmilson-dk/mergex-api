import { IPostRepository } from '@application/repositories/post';
import {
  GetAllUserPostsRepositoryRequest,
  GetAllUserPostsRepositoryResponse,
} from '@application/repositories/post/ports';
import { PostCreateDto } from '@domain/post/dtos';
import { prismaDB } from '@infra/database/prisma';

export class PrismaPgPostRepository implements IPostRepository {
  async getPostsByUserId(data: GetAllUserPostsRepositoryRequest): Promise<GetAllUserPostsRepositoryResponse> {
    const page = data.page < 1 ? 1 : data.page;
    const limit = data.limit < 1 ? 10 : data.limit;

    const posts = await prismaDB.post.findMany({
      where: { author_id: data.userId },
      skip: (page - 1) * data.limit,
      take: limit,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        content: true,
        author_id: true,
        created_at: true,
        likes: {
          select: { id: true },
        },
        dislikes: {
          select: { id: true },
        },
      },
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
