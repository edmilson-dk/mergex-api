import { UserCreateDto, UserDbStoredDto, UserDto, UserSimpleDto, UserStoredDto } from '../dtos';

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

  static fromDbToUserStoredDto(params: UserDbStoredDto): UserStoredDto {
    return {
      id: params.id,
      email: params.email,
      username: params.username,
      name: params.name,
      bio: params.bio,
      githubProfile: params.github_profile,
      githubUsername: params.github_username,
      githubId: params.github_id,
      password: params.password,
      createdAt: params.created_at.toISOString(),
      website: params.website,
      dateOfBirth: params.date_of_birth ? params.date_of_birth.toISOString() : null,
      location: params.location,
      bannerUrl: params.banner_url,
      avatarUrl: params.avatar_url,
      isDisabled: params.is_disabled,
    };
  }

  static toUserDto(params: UserStoredDto): UserDto {
    return {
      id: params.id,
      email: params.email,
      username: params.username,
      name: params.name,
      bio: params.bio,
      githubProfile: params.githubProfile,
      githubUsername: params.githubUsername,
      githubId: params.githubId,
      createdAt: params.createdAt,
      website: params.website,
      dateOfBirth: params.dateOfBirth,
      location: params.location,
      bannerUrl: params.bannerUrl,
      avatarUrl: params.avatarUrl,
      isDisabled: params.isDisabled,
    };
  }

  static fromDbToUserSimpleDto(params: any): UserSimpleDto {
    return {
      id: params.id,
      name: params.name,
      username: params.username,
      avatarUrl: params.avatar_url,
    };
  }
}
