import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListDeliveryUseCase } from './ListDeliveryUseCase';

interface IRequest {
  neighborhood?: string;
}

class ListDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { neighborhood }: IRequest = request.query;

    const listDelivery = container.resolve(ListDeliveryUseCase);

    const deliveries = await listDelivery.execute({
      user_id,
      neighborhood,
    });

    return response.status(200).json(deliveries);
  }
}

export { ListDeliveryController };
