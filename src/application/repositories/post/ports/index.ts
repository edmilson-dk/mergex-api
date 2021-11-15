import { PostStoredDto } from '@domain/post/dtos';

export type GetAllUserPostsRepositoryResponse = {
  posts: PostStoredDto[];
};
