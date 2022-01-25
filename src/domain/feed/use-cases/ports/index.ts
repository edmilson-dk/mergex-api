import { UserFeedDto } from '@domain/feed/dtos';
import { Either } from '@shared/error-handler/either';

export type GetUserFeedUseCaseSuccess = UserFeedDto;
export type GetUserFeedUseCaseFailure = {};
export type GetUserFeedUseCaseResponse = Either<GetUserFeedUseCaseFailure, GetUserFeedUseCaseSuccess>;
