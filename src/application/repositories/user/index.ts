import { UserCreateDto } from '@domain/user/dtos';

export type FindUserRepositoryResponse = {
  id: string | null;
  githubId: string | null;
};

export interface IUserRepository {
  findByGithubId(githubId: string): Promise<FindUserRepositoryResponse>;
  findByEmail(email: string): Promise<FindUserRepositoryResponse>;
  findByUsername(username: string): Promise<FindUserRepositoryResponse>;
  createUser(data: UserCreateDto): Promise<{ id: string }>;
}
