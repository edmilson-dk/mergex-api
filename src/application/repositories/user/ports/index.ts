import { UserStoredDto } from '@domain/user/dtos';

export type FindUserRepositoryResponse = {
  id: string | null;
  githubId: string | null;
};

export type GetUserStoredRepositoryResponse = UserStoredDto & {
  password: string;
  id: string;
};
