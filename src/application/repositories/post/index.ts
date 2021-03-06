import { PostCreateDto } from '@domain/post/dtos';
import { GetAllUserPostsRepositoryRequest, GetAllUserPostsRepositoryResponse } from './ports';

export interface IPostRepository {
  createPost(data: PostCreateDto): Promise<{ id: string }>;
  deleteUserPost(postId: string): Promise<string>;
  getPostsByUserId(data: GetAllUserPostsRepositoryRequest): Promise<GetAllUserPostsRepositoryResponse>;
}
