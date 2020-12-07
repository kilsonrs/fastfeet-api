import { Router } from 'express';
import CreateDeliveryService from '../services/CreateDeliveryService';
import ListDeliveryService from '../services/ListDeliveryService';
import UpdateDeliveryService from '../services/UpdateDeliveryService';

const deliveriesRouter = Router();

deliveriesRouter.get('/', async (request, response) => {
  const listDeliveries = new ListDeliveryService();
  const deliveries = await listDeliveries.execute();
  return response.json(deliveries);
});

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

deliveriesRouter.put('/:delivery_id', async (request, response) => {
  const updateDelivery = new UpdateDeliveryService();
  const { delivery_id } = request.params;
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

  const delivery = await updateDelivery.execute({
    delivery_id,
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

export default deliveriesRouter;
