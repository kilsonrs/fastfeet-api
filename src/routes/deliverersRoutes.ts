import { Router } from 'express';

import { AuthenticateDeliverymanController } from '../modules/accounts/useCases/AuthenticateDeliveryman/AuthenticateDeliverymanController';

const deliverersRoutes = Router();

const authenticateDeliverymanController = new AuthenticateDeliverymanController();

deliverersRoutes.post('/sessions', authenticateDeliverymanController.handle);

export { deliverersRoutes };
