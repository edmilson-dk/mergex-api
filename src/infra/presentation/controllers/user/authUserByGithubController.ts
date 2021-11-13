import { Request, Response } from 'express';

import { IGithubServices } from '@application/services/github';
import { IUserUseCases } from '@domain/user/use-cases';
import { createJWT } from '@shared/security';

export class AuthUserByGithubController {
  private readonly userUseCase: IUserUseCases;
  private readonly githubServices: IGithubServices;

  constructor(userUseCases: IUserUseCases, githubServices: IGithubServices) {
    this.userUseCase = userUseCases;
    this.githubServices = githubServices;
  }

  public async handle(req: Request, res: Response) {
    try {
      const { github_code, password } = req.body;

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

      const userOrError = await this.userUseCase.authUserByGithubId({
        githubId: githubUserInfos.githubId,
        password: String(password),
      });

      if (userOrError.isLeft()) {
        return res.status(400).send({ message: userOrError.value.message });
      }

      const user = userOrError.value;
      const token = createJWT({
        email: user.email,
        id: user.id,
        githubId: githubUserInfos.githubId,
      });

      return res.status(201).send({
        message: 'User by github auth success',
        user,
        token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}
