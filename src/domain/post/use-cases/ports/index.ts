import { InvalidPostContentError } from '@domain/post/entity/errors/invalidPostContentError';
import { Either } from '@shared/error-handler/either';

export type CreatePostUseCaseSuccess = { id: string };
export type CreatePostUseCaseFailure = InvalidPostContentError;
export type CreatePostUseCaseResposense = Either<CreatePostUseCaseFailure, CreatePostUseCaseSuccess>;
