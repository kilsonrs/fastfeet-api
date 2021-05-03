import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRecipientUseCase } from './ListRecipientUseCase';

class ListRecipientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRecipientUseCase = container.resolve(ListRecipientUseCase);
    const recipients = await listRecipientUseCase.execute();
    return response.status(200).json(recipients);
  }
}

export { ListRecipientController };
