import { Request, Response } from 'express';

import { UserUseCases } from '@application/use-cases/user';
import { CreateUserController } from '@infra/presentation/controllers/user/createUserController';
import { GithubServicesByApi } from '@infra/services/github';
import { PrismaPgUserRepository } from '@infra/repositories/user';
import { AuthUserByGithubController } from '@infra/presentation/controllers/user/authUserByGithubController';
import { AuthUserByEmailController } from '@infra/presentation/controllers/user/authUserByEmailController';
import { UpdateUserProfileController } from '@infra/presentation/controllers/user/updateUserProfileController';
import { UpdateUserAvatarController } from '@infra/presentation/controllers/user/updateUserAvatarController';
import { UpdateUserBannerController } from '@infra/presentation/controllers/user/userUserBannerController';
import { SearchUserByNameController } from '@infra/presentation/controllers/user/searchUserByNameController';

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

export function makeUpdateUserAvatarController(req: Request, res: Response) {
  const controller = new UpdateUserAvatarController(userUseCases);
  return controller.handle(req, res);
}

export function makeUpdateUserBannerController(req: Request, res: Response) {
  const controller = new UpdateUserBannerController(userUseCases);
  return controller.handle(req, res);
}

export function makeSearchUserByNameController(req: Request, res: Response) {
  const controller = new SearchUserByNameController(userUseCases);
  return controller.handle(req, res);
}
