import { Request, Response } from 'express';
import UpdateUserUseCase from './UpdateUserUseCase';

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      this.updateUserUseCase.execute(request.body);
      return response.status(201).send();
    } catch (err) {
      console.error(err);
      return response.status(err.statusCode).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

export default UpdateUserController;