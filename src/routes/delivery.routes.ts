import { Router } from 'express';
import DeliveryController from '../controllers/DeliveryController';
import ensureAdminOnly from '../middlewares/ensureAdminOnly';

const deliveryRouter = Router();
deliveryRouter.use(ensureAdminOnly);

const deliveryController = new DeliveryController();

deliveryRouter.get('/', deliveryController.index);
deliveryRouter.post('/', deliveryController.create);
deliveryRouter.put('/:delivery_id', deliveryController.update);
deliveryRouter.delete('/:delivery_id', deliveryController.delete);

export default deliveryRouter;
