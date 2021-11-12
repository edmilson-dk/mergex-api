import { Request, Response } from 'express';

import { UserUseCases } from '@application/use-cases/user';
import { CreateUserController } from '@infra/presentation/controllers/user/createUserController';
import { GithubServicesByApi } from '@infra/services/github';

const userUseCases = new UserUseCases();
const githubServices = new GithubServicesByApi();

export async function makeCreateUserController(req: Request, res: Response) {
  const controller = new CreateUserController(userUseCases, githubServices);
  return await controller.handle(req, res);
}
