import { FindUserRepositoryResponse, IUserRepository } from '@application/repositories/user';
import { UserCreateDto } from '@domain/user/dtos';
import { prismaDB } from '@infra/database/prisma';

export class PrismaPgUserRepository implements IUserRepository {
  async findByGithubId(githubId: string): Promise<FindUserRepositoryResponse> {
    const user = await prismaDB.user.findFirst({
      where: { githubId },
      select: {
        id: true,
        githubId: true,
      },
    });

    return {
      id: user?.id || null,
      githubId: user?.githubId || null,
    };
  }

  async findByEmail(email: string): Promise<FindUserRepositoryResponse> {
    const user = await prismaDB.user.findFirst({
      where: { email },
      select: {
        id: true,
        githubId: true,
      },
    });

    return {
      id: user?.id || null,
      githubId: user?.githubId || null,
    };
  }

  async createUser(data: UserCreateDto): Promise<{ id: string }> {
    const user = await prismaDB.user.create({
      data: { ...data },
      select: { id: true },
    });

    return { id: user.id };
  }
}
