import { Either } from '@shared/error-handler/either';
import { ExistingByEmailUserError } from '../errors/existingByEmailUserError';
import { ExistingByGithubIdUserError } from '../errors/existingByGithubIdUserError';

export type CreateUserUseCaseSuccess = { id: string };
export type CreateUserUseCaseFailure = ExistingByGithubIdUserError | ExistingByEmailUserError;
export type CreateUserUseCaseResponse = Either<CreateUserUseCaseFailure, CreateUserUseCaseSuccess>;

export type GetUserByEmailRequest = {
  email: string;
  password: string;
};

export type GetUserByGithubRequest = {
  githubCode: string;
  password: string;
};
