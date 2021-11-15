import { PostCreateDto } from '@domain/post/dtos';
import { GetAllUserPostsRepositoryResponse } from './ports';

export interface IPostRepository {
  createPost(data: PostCreateDto): Promise<{ id: string }>;
  getPostsByUserId(userId: string): Promise<GetAllUserPostsRepositoryResponse>;
}
