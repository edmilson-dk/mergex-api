import { UserCreateDto, UserProfileDto, UserSimpleDto } from '@domain/user/dtos';
import { FindUserRepositoryResponse, GetUserStoredRepositoryResponse } from './ports';

export interface IUserRepository {
  findByGithubId(githubId: string): Promise<FindUserRepositoryResponse>;
  findByEmail(email: string): Promise<FindUserRepositoryResponse>;
  findByUsername(username: string): Promise<FindUserRepositoryResponse>;
  getUserByEmail(email: string): Promise<GetUserStoredRepositoryResponse>;
  getUserByGithubId(githubId: string): Promise<GetUserStoredRepositoryResponse>;
  createUser(data: UserCreateDto): Promise<{ id: string }>;
  updateUserProfile: (data: UserProfileDto, userId: string) => Promise<UserProfileDto>;
  updateUserAvatar: (avatarUrl: string, userId: string) => Promise<{ avatar: string }>;
  updateUserBanner: (bannerUrl: string, userId: string) => Promise<{ banner: string }>;
  getUsersByName: (name: string) => Promise<UserSimpleDto[]>;
  getUsersByUsername: (username: string) => Promise<UserSimpleDto[]>;
}
