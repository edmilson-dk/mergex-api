import { Either } from '@shared/error-handler/either';
import { InvalidEmailError } from '../errors/invalidEmailError';
import { InvalidNameError } from '../errors/invalidNameError';
import { InvalidPasswordError } from '../errors/invalidPassword';
import { InvalidUsernameError } from '../errors/invalidUsername';

export type CreateUserSuccess = { id: string };
export type CreateUserFailure = InvalidEmailError | InvalidNameError | InvalidPasswordError | InvalidUsernameError;
export type CreateUserResponse = Either<CreateUserFailure, CreateUserSuccess>;
