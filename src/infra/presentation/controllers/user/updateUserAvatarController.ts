import { Request, Response } from 'express';

import { IUserUseCases } from '@domain/user/use-cases';

export class UpdateUserAvatarController {
  private readonly userUseCase: IUserUseCases;

  constructor(userUseCases: IUserUseCases) {
    this.userUseCase = userUseCases;
  }

  public async handle(req: Request, res: Response) {
    try {
      const fileOrUndefined = req.file;
      const userId = req.userId;

      if (!fileOrUndefined) {
        return res.status(400).send({ message: 'Image file is required' });
      }

      const fileSavedName = fileOrUndefined.filename;
      await this.userUseCase.updateUserAvatar(fileSavedName, userId);

      return res.status(200).send({
        avatarUrl: fileSavedName,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}
