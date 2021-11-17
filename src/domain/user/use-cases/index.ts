import { UserCreateDto, UserProfileDto } from '../dtos';
import {
  CreateUserUseCaseResponse,
  AuthUserByEmailRequest,
  AuthUserByGithubRequest,
  AuthUserByEmailUseCaseResponse,
  AuthUserByGithubUseCaseResponse,
  UpdateUserProfileUseCaseResponse,
} from './ports';

export interface IUserUseCases {
  createUser: (data: UserCreateDto) => Promise<CreateUserUseCaseResponse>;
  authUserByEmail: (data: AuthUserByEmailRequest) => Promise<AuthUserByEmailUseCaseResponse>;
  authUserByGithubId: (data: AuthUserByGithubRequest) => Promise<AuthUserByGithubUseCaseResponse>;
  updateUserProfile: (data: UserProfileDto, userId: string) => Promise<UpdateUserProfileUseCaseResponse>;
}
