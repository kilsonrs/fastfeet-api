import { Router } from 'express';
import CreateDeliveryService from '../services/CreateDeliveryService';
import ListDeliveryService from '../services/ListDeliveryService';

const deliveriesRouter = Router();

deliveriesRouter.post('/', async (request, response) => {
  const createDelivery = new CreateDeliveryService();
  const {
    deliveryman_id,
    recipient,
    product,
    address,
    postal_code,
    neighborhood,
    city,
    state,
  } = request.body;

  const delivery = await createDelivery.execute({
    deliveryman_id,
    recipient,
    product,
    address,
    postal_code,
    neighborhood,
    city,
    state,
  });
  return response.json(delivery);
});

deliveriesRouter.get('/', async (request, response) => {
  const listDeliveries = new ListDeliveryService();
  const deliveries = await listDeliveries.execute();
  return response.json(deliveries);
});
export default deliveriesRouter;
