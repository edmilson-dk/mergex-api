import { NotFoundUserError } from '../errors/notFoundUserError';
import { InvalidGithubCodeError } from '../errors/invalidGithubCodeError';
import { Either } from '@shared/error-handler/either';

export type GetUserInfosSuccess = {
  githubUsername: string;
  githubId: string;
  githubProfile: string;
  githubAvatarUrl: string;
};

export type GetUserInfosFailure = NotFoundUserError | InvalidGithubCodeError;
export type GetUserInfosResponse = Either<GetUserInfosFailure, GetUserInfosSuccess>;
