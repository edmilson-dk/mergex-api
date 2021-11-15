import { PostStoredDto } from '@domain/post/dtos';
import { InvalidPostContentError } from '@domain/post/entity/errors/invalidPostContentError';
import { Either } from '@shared/error-handler/either';

export type CreatePostUseCaseSuccess = { id: string };
export type CreatePostUseCaseFailure = InvalidPostContentError;
export type CreatePostUseCaseResposense = Either<CreatePostUseCaseFailure, CreatePostUseCaseSuccess>;

export type GetAllUserPostsUseCaseSuccess = { posts: PostStoredDto[] };
export type GetAllUserPostsUseCaseFailure = { posts: [] };
export type GetAllUserPostsUseCaseResposense = Either<GetAllUserPostsUseCaseFailure, GetAllUserPostsUseCaseSuccess>;
export type GetAllUserPostsUseCaseRequest = {
  userId: string;
  page: number;
  limit: number;
};
