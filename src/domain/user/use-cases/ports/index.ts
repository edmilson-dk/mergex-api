import { UserDbStoredDto, UserDto, UserProfileDto } from '@domain/user/dtos';
import { InvalidBioError } from '@domain/user/entity/errors/invalidBioError';
import { InvalidNameError } from '@domain/user/entity/errors/invalidNameError';
import { InvalidUsernameError } from '@domain/user/entity/errors/invalidUsername';
import { CreateUserEntityFailure } from '@domain/user/entity/ports';
import { Either } from '@shared/error-handler/either';
import { ExistingByEmailUserError } from '../errors/existingByEmailUserError';
import { ExistingByGithubIdUserError } from '../errors/existingByGithubIdUserError';
import { ExistingByUsernameUserError } from '../errors/existingByUsernameError';
import { InvalidUserCredentialsError } from '../errors/invalidUserCredentialsError';
import { NotExistsUserByEmailError } from '../errors/notExistsUserByEmailError';
import { NotExistsUserByGithubIdError } from '../errors/notExistsUserByGithubIdError';

export type CreateUserUseCaseSuccess = { id: string };
export type CreateUserUseCaseFailure =
  | ExistingByGithubIdUserError
  | ExistingByEmailUserError
  | ExistingByUsernameUserError
  | CreateUserEntityFailure;
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

export type UpdateUserProfileUseCaseSuccess = UserProfileDto;
export type UpdateUserProfileUseCaseFailure =
  | ExistingByUsernameUserError
  | InvalidBioError
  | InvalidUsernameError
  | InvalidNameError;
export type UpdateUserProfileUseCaseResponse = Either<UpdateUserProfileUseCaseFailure, UpdateUserProfileUseCaseSuccess>;
