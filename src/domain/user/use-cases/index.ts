import { UserCreateDto } from '../dtos';
import { CreateUserResponse } from './ports/responses';

export interface IUserUseCases {
  createUser: (data: UserCreateDto) => Promise<CreateUserResponse>;
}
