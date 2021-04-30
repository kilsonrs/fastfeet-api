import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user = request.body;
    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    Object.assign(user, { id: request.params.id });
    await updateUserUseCase.execute(user);
    return response.status(201).send();
  }
}

export { UpdateUserController };
