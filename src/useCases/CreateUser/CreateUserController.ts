import { Request, Response } from 'express';
import CreateUserUseCase from './CreateUserUseCase';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.createUserUseCase.execute(request.body);
      return response.status(201).send();
    } catch (err) {
      console.error(err.message);

      return response.status(err.statusCode).json({
        message: err.message || 'Unexpected Error',
      });
    }
  }
}

export default CreateUserController;
