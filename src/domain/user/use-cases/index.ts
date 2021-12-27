import { UserCreateDto, UserProfileDto, UserSimpleDto } from '../dtos';
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
  updateUserAvatar: (avatarUrl: string, userId: string) => Promise<{ avatar: string }>;
  updateUserBanner: (bannerUrl: string, userId: string) => Promise<{ banner: string }>;
  searchUserByName: (name: string) => Promise<UserSimpleDto[]>;
  searchUserByUsername: (username: string) => Promise<UserSimpleDto[]>;
}
