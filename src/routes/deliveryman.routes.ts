import { Request, Response, Router } from 'express';
import Delivery from '../models/Delivery';
import ListDeliverymanDeliveryService from '../services/ListDeliverymanDeliveryService';

const deliverymanRouter = Router();

deliverymanRouter.get(
  '/:deliveryman_id/deliveries',
  async (request: Request, response: Response): Promise<Delivery[]> => {
    const { deliveryman_id } = request.params;
    const listDeliverymanDelivery = new ListDeliverymanDeliveryService();

    const deliveries = await listDeliverymanDelivery.execute({
      deliveryman_id,
    });

    return response.json(deliveries);
  },
);

export default deliverymanRouter;
