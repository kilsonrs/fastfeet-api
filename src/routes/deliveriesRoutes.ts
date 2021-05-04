import { Router } from 'express';

import { CreateDeliveryController } from '../modules/deliveries/useCases/createDelivey/CreateDeliveryController';
import { ListDeliveryController } from '../modules/deliveries/useCases/listDelivery/ListDeliveryController';
import { ensureAdminOnly } from '../shared/middlewares/ensureAdminOnly';
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated';

const deliveriesRoutes = Router();

const createDeliveryController = new CreateDeliveryController();
const listDeliveryController = new ListDeliveryController();

deliveriesRoutes.use(ensureAuthenticated);
deliveriesRoutes.get('/', listDeliveryController.handle);

deliveriesRoutes.use(ensureAdminOnly);
deliveriesRoutes.post('/', createDeliveryController.handle);

export { deliveriesRoutes };
