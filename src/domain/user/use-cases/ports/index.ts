import { UserDbStoredDto, UserDto } from '@domain/user/dtos';
import { CreateUserEntityFailure } from '@domain/user/entity/ports';
import { Either } from '@shared/error-handler/either';
import { ExistingByEmailUserError } from '../errors/existingByEmailUserError';
import { ExistingByGithubIdUserError } from '../errors/existingByGithubIdUserError';
import { InvalidUserCredentialsError } from '../errors/invalidUserCredentialsError';
import { NotExistsUserByEmailError } from '../errors/notExistsUserByEmailError';
import { NotExistsUserByGithubIdError } from '../errors/notExistsUserByGithubIdError';

export type CreateUserUseCaseSuccess = { id: string };
export type CreateUserUseCaseFailure = ExistingByGithubIdUserError | ExistingByEmailUserError | CreateUserEntityFailure;
export type CreateUserUseCaseResponse = Either<CreateUserUseCaseFailure, CreateUserUseCaseSuccess>;

export type AuthUserByEmailRequest = {
  email: string;
  password: string;
};

export type AuthUserByGithubRequest = {
  githubId: string;
  password: string;
};

export type AuthUserByEmailUseCaseSuccess = UserDto;
export type AuthUserByEmailUseCaseFailure = NotExistsUserByEmailError | InvalidUserCredentialsError;
export type AuthUserByEmailUseCaseResponse = Either<AuthUserByEmailUseCaseFailure, AuthUserByEmailUseCaseSuccess>;

export type AuthUserByGithubUseCaseSuccess = UserDto;
export type AuthUserByGithubUseCaseFailure = NotExistsUserByGithubIdError | InvalidUserCredentialsError;
export type AuthUserByGithubUseCaseResponse = Either<AuthUserByGithubUseCaseFailure, AuthUserByGithubUseCaseSuccess>;
