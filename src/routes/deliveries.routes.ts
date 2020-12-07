import { Router } from 'express';
import CreateDeliveryService from '../services/CreateDeliveryService';

const deliveriesRouter = Router();

deliveriesRouter.post('/', async (request, response) => {
  const createDelivery = new CreateDeliveryService();
  const { user } = request;
  const {
    product,
    address,
    postal_code,
    neighborhood,
    city,
    state,
  } = request.body;

  const delivery = await createDelivery.execute({
    deliveryman_id: user.id,
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
