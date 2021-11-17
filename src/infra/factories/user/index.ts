import { Request, Response } from 'express';

import { UserUseCases } from '@application/use-cases/user';
import { CreateUserController } from '@infra/presentation/controllers/user/createUserController';
import { GithubServicesByApi } from '@infra/services/github';
import { PrismaPgUserRepository } from '@infra/repositories/user';
import { AuthUserByGithubController } from '@infra/presentation/controllers/user/authUserByGithubController';
import { AuthUserByEmailController } from '@infra/presentation/controllers/user/authUserByEmailController';
import { UpdateUserProfileController } from '@infra/presentation/controllers/user/updateUserProfileController';

const userRepository = new PrismaPgUserRepository();
const userUseCases = new UserUseCases(userRepository);
const githubServices = new GithubServicesByApi();

export async function makeCreateUserController(req: Request, res: Response) {
  const controller = new CreateUserController(userUseCases, githubServices);
  return await controller.handle(req, res);
}

export async function makeAuthUserByGithubController(req: Request, res: Response) {
  const controller = new AuthUserByGithubController(userUseCases, githubServices);
  return await controller.handle(req, res);
}

export async function makeAuthUserByEmailController(req: Request, res: Response) {
  const controller = new AuthUserByEmailController(userUseCases);
  return await controller.handle(req, res);
}

export async function makeUpdateUserProfileController(req: Request, res: Response) {
  const controller = new UpdateUserProfileController(userUseCases);
  return await controller.handle(req, res);
}
