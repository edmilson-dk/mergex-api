import { Request, Response } from 'express';

import { IGithubServices } from '@application/services/github';
import { IUserUseCases } from '@domain/user/use-cases';

export class CreateUserController {
  private readonly userUseCase: IUserUseCases;
  private readonly githubServices: IGithubServices;

  constructor(userUseCases: IUserUseCases, githubServices: IGithubServices) {
    this.userUseCase = userUseCases;
    this.githubServices = githubServices;
  }

  public async handle(req: Request, res: Response) {
    try {
      const { github_code, name, username, email, password, bio } = req.body;

      if (!github_code) {
        return res.status(400).send({ message: 'github_code is required' });
      }

      const githubUserInfosOrError = await this.githubServices.getUserInfos({
        code: String(github_code),
      });

      if (githubUserInfosOrError.isLeft()) {
        return res.status(400).send({ message: githubUserInfosOrError.value.message });
      }

      const githubUserInfos = githubUserInfosOrError.value;

      const userOrError = await this.userUseCase.createUser({
        name,
        username,
        email,
        password,
        bio,
        githubId: githubUserInfos.githubId,
        githubUsername: githubUserInfos.githubUsername,
        avatarUrl: githubUserInfos.githubAvatarUrl,
        githubProfile: githubUserInfos.githubProfile,
      });

      if (userOrError.isLeft()) {
        return res.status(400).send({ message: userOrError.value.message });
      }

      return res.status(201).send({
        message: 'User created successfully',
        data: userOrError.value,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}
