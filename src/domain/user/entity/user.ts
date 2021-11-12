import { Either, left, right } from '@shared/error-handler/either';
import {
  isValidBio,
  isValidEmail,
  isValidGithubUsername,
  isValidName,
  isValidPassword,
  isValidUsername,
} from '@shared/validators';
import { UserCreateDto } from '../dtos';
import { InvalidBioError } from './errors/invalidBioError';
import { InvalidEmailError } from './errors/invalidEmailError';
import { InvalidGithubUsernameError } from './errors/invalidGithubUsername';
import { InvalidNameError } from './errors/invalidNameError';
import { InvalidPasswordError } from './errors/invalidPassword';
import { InvalidUsernameError } from './errors/invalidUsername';
import { CreateUserEntityResponse } from './ports/responses';

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

  private createBio(bio: string): Either<InvalidBioError, string> {
    const isValid = isValidBio(bio);
    return isValid ? right(bio) : left(new InvalidBioError(bio));
  }

  public build(data: UserCreateDto): CreateUserEntityResponse {
    const objects: ObjectsBuildType = {
      name: this.createName(data.name),
      email: this.createEmail(data.email),
      password: this.createPassword(data.password),
      username: this.createUsername(data.username),
      githubUsername: this.createGithubUsername(data.githubUsername),
      bio: this.createBio(data.bio),
    };

    if (objects.name.isLeft()) {
      return left(new InvalidNameError(data.name));
    }

    if (objects.email.isLeft()) {
      return left(new InvalidEmailError(data.email));
    }

    if (objects.password.isLeft()) {
      return left(new InvalidPasswordError(data.password));
    }

    if (objects.username.isLeft()) {
      return left(new InvalidUsernameError(data.username));
    }

    if (objects.githubUsername.isLeft()) {
      return left(new InvalidGithubUsernameError(data.githubUsername));
    }

    if (objects.bio.isLeft()) {
      return left(new InvalidBioError(data.bio));
    }

    return right({
      name: objects.name.value as string,
      email: objects.email.value as string,
      password: objects.password.value as string,
      username: objects.username.value as string,
      githubUsername: objects.githubUsername.value as string,
      githubId: data.githubId,
      avatarUrl: data.avatarUrl,
      bio: data.bio,
      githubProfile: data.githubProfile,
    });
  }
}
