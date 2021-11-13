import { UserCreateDto } from '../dtos';

export class UserMappers {
  static toCreateUserDto(params: any): UserCreateDto {
    return {
      email: params.email,
      password: params.password,
      name: params.name,
      avatarUrl: params.avatarUrl,
      bio: params.bio,
      githubId: params.githubId,
      githubProfile: params.githubProfile,
      githubUsername: params.githubUsername,
      username: params.username.toLowerCase(),
    };
  }
}
