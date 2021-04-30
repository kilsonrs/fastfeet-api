import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cpf,
      email,
      is_deliveryman,
      password,
      password_confirmation,
    } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute({
      name,
      cpf,
      email,
      is_deliveryman,
      password,
      password_confirmation,
    });
    return response.status(201).send();
  }
}

export { CreateUserController };
