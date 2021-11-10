import { Either, left, right } from '@shared/error-handler/either';
import { isValidEmail, isValidName } from '@shared/validators';
import { UserCreateDto } from '../dtos';
import { InvalidEmailError } from '../use-cases/errors/invalidEmailError';
import { InvalidNameError } from '../use-cases/errors/invalidNameError';

export class User {
  private createName(name: string): Either<InvalidNameError, string> {
    const isValid = isValidName(name);
    return isValid ? right(name) : left(new InvalidNameError(name));
  }

  private createEmail(email: string): Either<InvalidEmailError, string> {
    const isValid = isValidEmail(email);
    return isValid ? right(email) : left(new InvalidEmailError(email));
  }

  public build(data: UserCreateDto) {}
}
