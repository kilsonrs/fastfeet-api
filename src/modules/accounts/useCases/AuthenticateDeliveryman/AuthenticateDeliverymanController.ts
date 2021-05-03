import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';

class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const authenticateDeliveryman = container.resolve(
      AuthenticateDeliverymanUseCase,
    );

    const userSession = await authenticateDeliveryman.execute({
      cpf,
      password,
    });

    return response.status(200).json(userSession);
  }
}

export { AuthenticateDeliverymanController };
