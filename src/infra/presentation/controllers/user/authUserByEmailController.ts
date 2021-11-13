import { Request, Response } from 'express';

import { IUserUseCases } from '@domain/user/use-cases';
import { createJWT } from '@shared/security';

export class AuthUserByEmailController {
  private readonly userUseCase: IUserUseCases;

  constructor(userUseCases: IUserUseCases) {
    this.userUseCase = userUseCases;
  }

  public async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).send({ message: 'email is required' });
      }

      const userOrError = await this.userUseCase.authUserByEmail({
        email: String(email),
        password: String(password),
      });

      if (userOrError.isLeft()) {
        return res.status(400).send({ message: userOrError.value.message });
      }

      const user = userOrError.value;
      const token = createJWT({
        email: user.email,
        id: user.id,
        githubId: user.githubId,
      });

      return res.status(201).send({
        message: 'User by email auth success',
        user,
        token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}
