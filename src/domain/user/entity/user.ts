import { Either, left } from '@shared/error-handler/either';
import { isValidName } from '@shared/validators';
import { UserCreateDto } from '../dtos';
import { InvalidNameError } from '../use-cases/errors/invalidNameError';
import { right } from '../../../shared/error-handler/either/index';

export class User {
  private createName(name: string): Either<InvalidNameError, string> {
    const isValid = isValidName(name);
    return isValid ? right(name) : left(new InvalidNameError(name));
  }

  public build(data: UserCreateDto) {}
}
