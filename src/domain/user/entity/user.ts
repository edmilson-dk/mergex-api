import { Either, left, right } from '@shared/error-handler/either';
import { isValidEmail, isValidGithubUsername, isValidName, isValidPassword } from '@shared/validators';
import { UserCreateDto } from '../dtos';
import { InvalidEmailError } from '../use-cases/errors/invalidEmailError';
import { InvalidNameError } from '../use-cases/errors/invalidNameError';
import { InvalidPasswordError } from '../use-cases/errors/invalidPassword';
import { InvalidUsernameError } from '../use-cases/errors/invalidUsername';

export class User {
  private createName(name: string): Either<InvalidNameError, string> {
    const isValid = isValidName(name);
    return isValid ? right(name) : left(new InvalidNameError(name));
  }

  private createEmail(email: string): Either<InvalidEmailError, string> {
    const isValid = isValidEmail(email);
    return isValid ? right(email) : left(new InvalidEmailError(email));
  }

  private createPassword(password: string): Either<InvalidPasswordError, string> {
    const isValid = isValidPassword(password);
    return isValid ? right(password) : left(new InvalidPasswordError(password));
  }

  private createUsername(username: string): Either<InvalidUsernameError, string> {
    const isValid = isValidGithubUsername(username);
    return isValid ? right(username) : left(new InvalidUsernameError(username));
  }

  public build(data: UserCreateDto) {}
}
