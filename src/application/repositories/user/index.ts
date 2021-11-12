import { UserCreateDto } from '@domain/user/dtos';

type FindUserResponse = {
  id: string | null;
  githubId: string | null;
};

export interface IUserRepository {
  findByGithubId(githubId: string): Promise<FindUserResponse>;
  findByEmail(email: string): Promise<FindUserResponse>;
  createUser(data: UserCreateDto): Promise<{ id: string }>;
}
