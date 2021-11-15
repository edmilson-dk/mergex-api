import { PostStoredDto } from '@domain/post/dtos';

export type GetAllUserPostsRepositoryResponse = {
  posts: PostStoredDto[];
};

export type GetAllUserPostsRepositoryRequest = {
  userId: string;
  page: number;
  limit: number;
};
