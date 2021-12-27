import { IUserRepository } from '@application/repositories/user';
import { UserCreateDto, UserProfileDto, UserSimpleDto } from '@domain/user/dtos';
import { User } from '@domain/user/entity/user';
import { UserMappers } from '@domain/user/mappers';
import { IUserUseCases } from '@domain/user/use-cases';
import { ExistingByEmailUserError } from '@domain/user/use-cases/errors/existingByEmailUserError';
import { ExistingByGithubIdUserError } from '@domain/user/use-cases/errors/existingByGithubIdUserError';
import { ExistingByUsernameUserError } from '@domain/user/use-cases/errors/existingByUsernameError';
import { InvalidUserCredentialsError } from '@domain/user/use-cases/errors/invalidUserCredentialsError';
import { NotExistsUserByEmailError } from '@domain/user/use-cases/errors/notExistsUserByEmailError';
import { NotExistsUserByGithubIdError } from '@domain/user/use-cases/errors/notExistsUserByGithubIdError';
import {
  AuthUserByEmailRequest,
  AuthUserByEmailUseCaseResponse,
  AuthUserByGithubRequest,
  AuthUserByGithubUseCaseResponse,
  CreateUserUseCaseResponse,
  UpdateUserProfileUseCaseResponse,
} from '@domain/user/use-cases/ports/';
import { left, right } from '@shared/error-handler/either';
import { compareValue, hashValue } from '@shared/security';
import { isValidEmail, isValidPassword } from '@shared/validators';

export class UserUseCases implements IUserUseCases {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async updateUserProfile(data: UserProfileDto, userId: string): Promise<UpdateUserProfileUseCaseResponse> {
    const user = new User();
    const usernameOrError = data.username ? user.createUsername(data.username) : null;
    const nameOrError = data.name ? user.createName(data.name) : null;
    const bioOrError = data.bio ? user.createBio(data.bio) : null;

    if (usernameOrError && usernameOrError.isLeft()) {
      return left(usernameOrError.value);
    }
    if (nameOrError && nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    if (bioOrError && bioOrError.isLeft()) {
      return left(bioOrError.value);
    }

    if (usernameOrError) {
      const username = usernameOrError.value;
      const userByUsername = await this.userRepository.findByUsername(username);

      if (userByUsername.id) {
        return left(new ExistingByUsernameUserError(username));
      }
    }

    const userUpdated = await this.userRepository.updateUserProfile(data, userId);
    return right(userUpdated);
  }

  async createUser(data: UserCreateDto): Promise<CreateUserUseCaseResponse> {
    const user = new User();
    const userOrError = user.build(data);

    if (userOrError.isLeft()) return left(userOrError.value);

    const userBuilded = userOrError.value;
    const userFormatted = UserMappers.toCreateUserDto(userBuilded);

    const userByGithubId = await this.userRepository.findByGithubId(userFormatted.githubId);
    const userByEmail = await this.userRepository.findByEmail(userFormatted.email);
    const userByUsername = await this.userRepository.findByUsername(userFormatted.username);

    if (userByGithubId.githubId) {
      return left(new ExistingByGithubIdUserError(userFormatted.githubId));
    }
    if (userByEmail.id) {
      return left(new ExistingByEmailUserError(userFormatted.email));
    }
    if (userByUsername.id) {
      return left(new ExistingByUsernameUserError(userFormatted.username));
    }

    const hashedPassword = await hashValue(userBuilded.password);

    const userCreated = await this.userRepository.createUser({
      ...userFormatted,
      password: hashedPassword,
    });

    return right(userCreated);
  }

  async authUserByEmail(data: AuthUserByEmailRequest): Promise<AuthUserByEmailUseCaseResponse> {
    const emailIsValid = isValidEmail(data.email);
    const passwordIsValid = isValidPassword(data.password);

    if (!emailIsValid || !passwordIsValid) {
      return left(new InvalidUserCredentialsError());
    }

    const user = await this.userRepository.getUserByEmail(data.email);

    if (!user) {
      return left(new NotExistsUserByEmailError(data.email));
    }

    const hashedPassword = user.password;
    const isPasswordCorrect = await compareValue(data.password, hashedPassword);

    if (!isPasswordCorrect) {
      return left(new InvalidUserCredentialsError());
    }

    const userDto = UserMappers.toUserDto(user);
    return right(userDto);
  }

  async authUserByGithubId(data: AuthUserByGithubRequest): Promise<AuthUserByGithubUseCaseResponse> {
    const passwordIsValid = isValidPassword(data.password);

    if (!passwordIsValid) {
      return left(new InvalidUserCredentialsError());
    }

    const user = await this.userRepository.getUserByGithubId(data.githubId);

    if (!user) {
      return left(new NotExistsUserByGithubIdError(data.githubId));
    }

    const hashedPassword = user.password;
    const isPasswordCorrect = await compareValue(data.password, hashedPassword);

    if (!isPasswordCorrect) {
      return left(new InvalidUserCredentialsError());
    }

    const userDto = UserMappers.toUserDto(user);

    return right(userDto);
  }

  async updateUserAvatar(avatarUrl: string, userId: string): Promise<{ avatar: string }> {
    const userUpdated = await this.userRepository.updateUserAvatar(avatarUrl, userId);
    return { avatar: userUpdated.avatar };
  }

  async updateUserBanner(bannerUrl: string, userId: string): Promise<{ banner: string }> {
    const userUpdated = await this.userRepository.updateUserBanner(bannerUrl, userId);
    return { banner: userUpdated.banner };
  }

  async searchUserByName(name: string): Promise<UserSimpleDto[]> {
    const users = await this.userRepository.getUsersByName(name);
    return users;
  }
}
