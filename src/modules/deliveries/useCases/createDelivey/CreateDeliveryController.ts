import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

class CreateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id, recipient_id, package_name } = request.body;
    const createDeliveryUseCase = container.resolve(CreateDeliveryUseCase);
    const delivery = await createDeliveryUseCase.execute({
      deliveryman_id,
      recipient_id,
      package_name,
    });
    return response.status(200).json(delivery);
  }
}

export { CreateDeliveryController };
