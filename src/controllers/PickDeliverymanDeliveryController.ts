import { Request, Response } from 'express';
import { PickDeliverymanDeliveryService } from '../services/PickDeliverymanDeliveryService';

class PickDeliverymanDeliveryController {
  public async update(request: Request, response: Response): Promise<Response> {
    const deliveryman_id = request.user.id;
    const { delivery_id } = request.params;
    const pickDeliverymanDelivery = new PickDeliverymanDeliveryService();

    const delivery = await pickDeliverymanDelivery.execute({
      deliveryman_id,
      delivery_id,
    });

    return response.json(delivery);
  }
}

export { PickDeliverymanDeliveryController };
