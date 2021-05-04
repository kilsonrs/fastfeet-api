import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '../../../../shared/config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import { IHashProvider } from '../../../../shared/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  cpf: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    is_deliveryman: boolean;
  };
  token: string;
}

@injectable()
class AuthenticateDeliverymanUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ cpf, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByCpf(cpf);

    if (!user) {
      throw new AppError('Incorrect cpf/password combination', 401);
    }

    if (!user.is_deliveryman) {
      throw new AppError('You are not a delivery man', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect cpf/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const response = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_deliveryman: user.is_deliveryman,
      },
      token,
    };
    return response;
  }
}

export { AuthenticateDeliverymanUseCase };
