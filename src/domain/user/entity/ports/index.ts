import { Either } from '@shared/error-handler/either';
import { UserCreateDto } from '../../dtos';
import { InvalidEmailError } from '../errors/invalidEmailError';
import { InvalidNameError } from '../errors/invalidNameError';
import { InvalidPasswordError } from '../errors/invalidPassword';
import { InvalidUsernameError } from '../errors/invalidUsername';

export type CreateUserEntityFailure =
  | InvalidEmailError
  | InvalidNameError
  | InvalidPasswordError
  | InvalidUsernameError;
export type CreateUserEntityResponse = Either<CreateUserEntityFailure, UserCreateDto>;
