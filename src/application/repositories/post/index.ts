import { PostCreateDto } from '@domain/post/dtos';

export interface IPostRepository {
  createPost(data: PostCreateDto): Promise<{ id: string }>;
}
