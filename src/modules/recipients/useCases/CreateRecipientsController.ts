import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRecipientUseCase } from './CreateRecipientUseCase';

class CreateRecipientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      street_name,
      street_number,
      neighborhood,
      city,
      state,
      uf,
      postal_code,
    } = request.body;
    const createRecipientUseCase = container.resolve(CreateRecipientUseCase);
    const recipient = await createRecipientUseCase.execute({
      name,
      street_name,
      street_number,
      neighborhood,
      city,
      state,
      uf,
      postal_code,
    });
    return response.status(201).json(recipient);
  }
}

export { CreateRecipientsController };
