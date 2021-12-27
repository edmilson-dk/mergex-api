import { Request, Response } from 'express';

import { IUserUseCases } from '@domain/user/use-cases';

export class SearchUserByUsernameController {
  private readonly userUseCase: IUserUseCases;

  constructor(userUseCases: IUserUseCases) {
    this.userUseCase = userUseCases;
  }

  public async handle(req: Request, res: Response) {
    try {
      const username = req.query.username as string;

      if (!username) {
        return res.status(400).send({ message: 'query [username] is required' });
      }

      const users = await this.userUseCase.searchUserByUsername(username);
      return res.status(200).send({ users });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}
