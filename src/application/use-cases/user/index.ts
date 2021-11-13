import { IUserRepository } from '@application/repositories/user';
import { UserCreateDto } from '@domain/user/dtos';
import { User } from '@domain/user/entity/user';
import { UserMappers } from '@domain/user/mappers';
import { IUserUseCases } from '@domain/user/use-cases';
import { ExistingByEmailUserError } from '@domain/user/use-cases/errors/existingByEmailUserError';
import { ExistingByGithubIdUserError } from '@domain/user/use-cases/errors/existingByGithubIdUserError';
import { ExistingByUsernameUserError } from '@domain/user/use-cases/errors/existingByUsernameError';
import { CreateUserUseCaseResponse } from '@domain/user/use-cases/ports/responses';
import { left, right } from '@shared/error-handler/either';
import { hashValue } from '@shared/security';

export class UserUseCases implements IUserUseCases {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: UserCreateDto): Promise<CreateUserUseCaseResponse> {
    const user = new User();
    const userOrError = user.build(data);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const userBuilded = userOrError.value;
    const userFormatted = UserMappers.toCreateUserDto(userBuilded);

    const userByGithubId = await this.userRepository.findByGithubId(userFormatted.githubId);
    const userByEmail = await this.userRepository.findByEmail(userFormatted.email);
    const userByUsername = await this.userRepository.findByUsername(userFormatted.username);

    if (userByGithubId.githubId) {
      return left(new ExistingByGithubIdUserError(userFormatted.githubId));
    }

    if (userByEmail.githubId) {
      return left(new ExistingByEmailUserError(userFormatted.email));
    }

    if (userByUsername.githubId) {
      return left(new ExistingByUsernameUserError(userFormatted.username));
    }

    const hashedPassword = await hashValue(userBuilded.password);

    const userCreated = await this.userRepository.createUser({
      ...userFormatted,
      password: hashedPassword,
    });

    return right(userCreated);
  }

  async existsUsername(username: string): Promise<boolean> {
    const user = await this.userRepository.findByUsername(username);
    return user.id ? true : false;
  }
}
