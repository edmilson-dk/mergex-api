import { UserCreateDto } from '@domain/user/dtos';
import { FindUserRepositoryResponse, GetUserStoredRepositoryResponse } from './ports';

export interface IUserRepository {
  findByGithubId(githubId: string): Promise<FindUserRepositoryResponse>;
  findByEmail(email: string): Promise<FindUserRepositoryResponse>;
  findByUsername(username: string): Promise<FindUserRepositoryResponse>;
  getUserByEmail(email: string): Promise<GetUserStoredRepositoryResponse>;
  getUserByGithubId(githubId: string): Promise<GetUserStoredRepositoryResponse>;
  createUser(data: UserCreateDto): Promise<{ id: string }>;
}
