import { IUserRepository } from '@application/repositories/user';
import { UserCreateDto } from '@domain/user/dtos';
import { User } from '@domain/user/entity/user';
import { IUserUseCases } from '@domain/user/use-cases';
import { ExistingByGithubIdUserError } from '@domain/user/use-cases/errors/existingByGithubIdUserError';
import { CreateUserUseCaseResponse } from '@domain/user/use-cases/ports/responses';
import { left, right } from '@shared/error-handler/either';

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

    const userByGithubId = await this.userRepository.findByGithubId(userBuilded.githubId);
    const userByEmail = await this.userRepository.findByEmail(userBuilded.email);

    if (userByGithubId.githubId) {
      return left(new ExistingByGithubIdUserError(userByGithubId.githubId));
    }

    if (userByEmail.githubId) {
      return left(new ExistingByGithubIdUserError(userByEmail.githubId));
    }

    const userCreated = await this.userRepository.createUser(userBuilded);

    return right(userCreated);
  }
}
