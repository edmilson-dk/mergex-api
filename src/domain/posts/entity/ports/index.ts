import { PostCreateDto } from '@domain/posts/dtos';
import { Either } from '@shared/error-handler/either';
import { InvalidPostContentError } from '../errors/invalidPostContentError';

export type CreatePostEntityFailure = InvalidPostContentError;
export type CreatePostEntityResponse = Either<CreatePostEntityFailure, PostCreateDto>;
