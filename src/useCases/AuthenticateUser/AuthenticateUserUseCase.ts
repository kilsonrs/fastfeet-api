import { sign } from 'jsonwebtoken';

import User from '../../entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';
import authConfig from '../../shared/config/auth';
import AppError from '../../shared/errors/AppError';
import IHashProvider from '../../shared/providers/HashProvider/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      expiresIn,
    });

    const response = {
      user,
      token,
    };
    return response;
  }
}
