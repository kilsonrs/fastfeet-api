import { Request, Response } from 'express';

import ListDeliverymanDeliveryService from '../services/ListDeliverymanDeliveryService';

type Neighborhood = {
  neighborhood: string;
};

class DeliverymanDeliveriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const deliveryman_id = request.user.id;
    const { neighborhood } = request.query as Neighborhood;
    const listDeliverymanDelivery = new ListDeliverymanDeliveryService();

    const deliveries = await listDeliverymanDelivery.execute({
      deliveryman_id,
      neighborhood,
    });

    return response.json(deliveries);
  }
}

export default DeliverymanDeliveriesController;
