import { Either } from '@shared/error-handler/either';
import { ExistingUserError } from '../errors/existingUserError';

export type CreateUserUseCaseSuccess = { id: string };
export type CreateUserUseCaseResponse = Either<ExistingUserError, CreateUserUseCaseSuccess>;
