import { Request, Response } from 'express';

import { IUserUseCases } from '@domain/user/use-cases';

export class UpdateUserProfileController {
  private readonly userUseCase: IUserUseCases;

  constructor(userUseCases: IUserUseCases) {
    this.userUseCase = userUseCases;
  }

  public async handle(req: Request, res: Response) {
    try {
      const { name, username, bio, date_of_birth, location, website } = req.body;
      const userId = req.userId;

      const userUpdatedOrError = await this.userUseCase.updateUserProfile(
        {
          bio,
          date_of_birth,
          location,
          name,
          website,
          username,
        },
        userId,
      );

      if (userUpdatedOrError.isLeft()) {
        return res.status(400).send({ message: userUpdatedOrError.value.message });
      }

      return res.status(200).send({
        user: userUpdatedOrError.value,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}
