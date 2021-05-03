import { Router } from 'express';

import { CreateDeliveryController } from '../modules/deliveries/useCases/createDelivey/CreateDeliveryController';

const deliveriesRoutes = Router();

const createDeliveryController = new CreateDeliveryController();

deliveriesRoutes.post('/', createDeliveryController.handle);

export { deliveriesRoutes };
