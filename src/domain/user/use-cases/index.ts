import { UserCreateDto } from '../dtos';
import {
  CreateUserUseCaseResponse,
  AuthUserByEmailRequest,
  AuthUserByGithubRequest,
  AuthUserByEmailUseCaseResponse,
  AuthUserByGithubUseCaseResponse,
} from './ports';

export interface IUserUseCases {
  createUser: (data: UserCreateDto) => Promise<CreateUserUseCaseResponse>;
  authUserByEmail: (data: AuthUserByEmailRequest) => Promise<AuthUserByEmailUseCaseResponse>;
  authUserByGithubId: (data: AuthUserByGithubRequest) => Promise<AuthUserByGithubUseCaseResponse>;
}
