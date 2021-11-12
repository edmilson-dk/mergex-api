import { FindUserRepositoryResponse, IUserRepository } from '@application/repositories/user';
import { UserCreateDto } from '@domain/user/dtos';
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
      },
      select: { id: true },
    });

    return { id: user.id };
  }
}
