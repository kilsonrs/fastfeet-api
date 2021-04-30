import { Request, Response } from 'express';

import { UserMapper } from '../../../../shared/mappers/UserMapper';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  constructor(
    private authenticateUser: AuthenticateUserUseCase,
    private userMapper: UserMapper,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user, token } = await this.authenticateUser.execute(request.body);
      const mappedUser = this.userMapper.toDTO(user);

      const userSession = {
        user: mappedUser,
        token,
      };

      return response.status(200).json(userSession);
    } catch (err) {
      console.error(err.message);
      return response.status(err.statusCode).json({
        message: err.message || 'Unexpected Error',
      });
    }
  }
}

export { AuthenticateUserController };
