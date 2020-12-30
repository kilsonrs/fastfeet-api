import { Request, Response } from 'express';
import { FinalizeDeliverymanDeliveryService } from '../services/FinalizeDeliverymanDeliveryService';

class FinalizeDeliverymanDeliveryController {
  public async update(request: Request, response: Response): Promise<Response> {
    const deliveryman_id = request.user.id;
    const { delivery_id } = request.params;
    const { end_date } = request.body;
    const finalizeDeliverymanDelivery = new FinalizeDeliverymanDeliveryService();
    const delivery = await finalizeDeliverymanDelivery.execute({
      deliveryman_id,
      delivery_id,
      end_date,
    });
    return response.json(delivery);
  }
}

export { FinalizeDeliverymanDeliveryController };
