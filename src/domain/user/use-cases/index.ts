import { UserCreateDto } from '../dtos';
import { CreateUserUseCaseResponse } from './ports/responses';

export interface IUserUseCases {
  createUser: (data: UserCreateDto) => Promise<CreateUserUseCaseResponse>;
  existsUsername: (username: string) => Promise<boolean>;
}
