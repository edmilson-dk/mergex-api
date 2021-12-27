import { Request, Response } from 'express';

import { IUserUseCases } from '@domain/user/use-cases';

export class SearchUserController {
  private readonly userUseCase: IUserUseCases;

  constructor(userUseCases: IUserUseCases) {
    this.userUseCase = userUseCases;
  }

  public async handle(req: Request, res: Response) {
    try {
      const name = req.query.name as string;

      if (!name) {
        return res.status(400).send({ message: 'query [name] is required' });
      }

      const users = await this.userUseCase.searchUserByName(name);

      return res.status(200).send({ users });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}
