import { Either, left, right } from '@shared/error-handler/either';
import { isValidEmail, isValidGithubUsername, isValidName, isValidPassword, isValidUsername } from '@shared/validators';
import { UserCreateDto } from '../dtos';
import { InvalidEmailError } from '../use-cases/errors/invalidEmailError';
import { InvalidGithubUsernameError } from '../use-cases/errors/invalidGithubUsername';
import { InvalidNameError } from '../use-cases/errors/invalidNameError';
import { InvalidPasswordError } from '../use-cases/errors/invalidPassword';
import { InvalidUsernameError } from '../use-cases/errors/invalidUsername';
import { MultipleFieldsError } from '../use-cases/errors/multipleFieldsError';

type ObjectsBuildType = {
  [key: string]: Either<Error, string>;
};

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
    const isValid = isValidUsername(username);
    return isValid ? right(username) : left(new InvalidUsernameError(username));
  }

  private createGithubUsername(githubUsername: string): Either<InvalidGithubUsernameError, string> {
    const isValid = isValidGithubUsername(githubUsername);
    return isValid ? right(githubUsername) : left(new InvalidGithubUsernameError(githubUsername));
  }

  public build(data: UserCreateDto): Either<MultipleFieldsError, UserCreateDto> {
    const objects: ObjectsBuildType = {
      name: this.createName(data.name),
      email: this.createEmail(data.email),
      password: this.createPassword(data.password),
      username: this.createUsername(data.username),
      githubUsername: this.createGithubUsername(data.githubUsername),
    };

    const errors: { [key: string]: string }[] = [];

    Object.keys(objects).forEach((either) => {
      const field = objects[either];
      if (field.isLeft()) {
        errors.push({
          [either]: field.value.message,
        });
      }
    });

    if (errors.length > 0) {
      return left(new MultipleFieldsError(errors));
    }

    return right({
      name: objects.name.value as string,
      email: objects.email.value as string,
      password: objects.password.value as string,
      username: objects.username.value as string,
      githubUsername: objects.githubUsername.value as string,
      githubId: data.githubId,
    });
  }
}
