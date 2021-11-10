import { NotFoundUserError } from '../errors/notFoundUserError';
import { InvalidGithubCodeError } from '../errors/invalidGithubCodeError';
import { Either } from '@shared/error-handler/either';

export type GetUserInfosSuccess = {
  avatarUrl: string;
  githubUsername: string;
  githubId: number;
};
export type GetUserInfosFailure = NotFoundUserError | InvalidGithubCodeError;
export type GetUserInfosResponse = Either<GetUserInfosFailure, GetUserInfosSuccess>;
