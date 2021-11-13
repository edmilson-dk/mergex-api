import { UserCreateDto, UserStoredDto } from '../dtos';
import { CreateUserUseCaseResponse, GetUserByEmailRequest, GetUserByGithubRequest } from './ports';

export interface IUserUseCases {
  createUser: (data: UserCreateDto) => Promise<CreateUserUseCaseResponse>;
  existsUsername: (username: string) => Promise<boolean>;
  getUserByEmail: (data: GetUserByEmailRequest) => Promise<UserStoredDto>;
  getUserByGithub: (data: GetUserByGithubRequest) => Promise<UserStoredDto>;
}
