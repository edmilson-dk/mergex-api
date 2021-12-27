import { IUserRepository } from '@application/repositories/user';
import { FindUserRepositoryResponse, GetUserStoredRepositoryResponse } from '@application/repositories/user/ports';
import { UserCreateDto, UserProfileDto, UserSimpleDto } from '@domain/user/dtos';
import { UserMappers } from '@domain/user/mappers';
import { prismaDB } from '@infra/database/prisma';

export class PrismaPgUserRepository implements IUserRepository {
  async findByGithubId(githubId: string): Promise<FindUserRepositoryResponse> {
    const user = await prismaDB.user.findFirst({
      where: { github_id: githubId },
      select: {
        id: true,
        github_id: true,
      },
    });

    return {
      id: user?.id || null,
      githubId: user?.github_id || null,
    };
  }

  async findByEmail(email: string): Promise<FindUserRepositoryResponse> {
    const user = await prismaDB.user.findFirst({
      where: { email },
      select: {
        id: true,
        github_id: true,
      },
    });

    return {
      id: user?.id || null,
      githubId: user?.github_id || null,
    };
  }

  async createUser(data: UserCreateDto): Promise<{ id: string }> {
    const user = await prismaDB.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        github_id: data.githubId,
        bio: data.bio,
        github_profile: data.githubProfile,
        github_username: data.githubUsername,
        password: data.password,
        avatar_url: data.avatarUrl,
      },
      select: { id: true },
    });

    return { id: user.id };
  }

  async findByUsername(username: string): Promise<FindUserRepositoryResponse> {
    const user = await prismaDB.user.findFirst({
      where: { username },
      select: {
        id: true,
        github_id: true,
      },
    });

    return {
      id: user?.id || null,
      githubId: user?.github_id || null,
    };
  }

  async getUserByEmail(email: string): Promise<GetUserStoredRepositoryResponse> {
    const user = await prismaDB.user.findFirst({
      where: { email },
    });

    if (!user) return null;

    const response = UserMappers.fromDbToUserStoredDto(user);
    return response;
  }

  async getUserByGithubId(githubId: string): Promise<GetUserStoredRepositoryResponse> {
    const user = await prismaDB.user.findFirst({
      where: { github_id: githubId },
    });

    if (!user) return null;

    const response = UserMappers.fromDbToUserStoredDto(user);
    return response;
  }

  async updateUserProfile(data: UserProfileDto, userId: string): Promise<UserProfileDto> {
    const objectsValid: any = {};

    if (data.username) objectsValid.username = data.username;
    if (data.name) objectsValid.name = data.name;
    if (data.bio) objectsValid.bio = data.bio;
    if (data.date_of_birth) objectsValid.date_of_birth = data.date_of_birth;
    if (data.location) objectsValid.location = data.location;
    if (data.website) objectsValid.website = data.website;

    await prismaDB.user.update({
      where: { id: userId },
      data: {
        ...objectsValid,
      },
    });

    return objectsValid;
  }

  async updateUserAvatar(avatarUrl: string, userId: string): Promise<{ avatar: string }> {
    await prismaDB.user.update({
      where: { id: userId },
      data: {
        avatar_url: avatarUrl,
      },
    });

    return { avatar: avatarUrl };
  }

  async updateUserBanner(bannerUrl: string, userId: string): Promise<{ banner: string }> {
    await prismaDB.user.update({
      where: { id: userId },
      data: {
        banner_url: bannerUrl,
      },
    });

    return { banner: bannerUrl };
  }

  async getUsersByName(name: string): Promise<UserSimpleDto[]> {
    const users = await prismaDB.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatar_url: true,
      },
      orderBy: {
        name: 'asc',
      },
      skip: 0,
      take: 15,
    });

    return users.map(UserMappers.fromDbToUserSimpleDto);
  }
}
