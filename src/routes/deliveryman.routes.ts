import { Router } from 'express';
import DeliverymanDeliveriesController from '../controllers/DeliverymanDeliveriesController';
import DeliverymanHistoryController from '../controllers/DeliverymanHistoryController';
import PickDeliverymanDeliveryController from '../controllers/PickDeliverymanDeliveryController';
import FinalizeDeliverymanDeliveryController from '../controllers/FinalizeDeliverymanDeliveryController';

const deliverymanRouter = Router();
const deliverymanDeliveriesController = new DeliverymanDeliveriesController();
const deliverymanHistoryController = new DeliverymanHistoryController();
const pickDeliveryController = new PickDeliverymanDeliveryController();
const finalizeDeliveryController = new FinalizeDeliverymanDeliveryController();

deliverymanRouter.get('/deliveries', deliverymanDeliveriesController.index);
deliverymanRouter.get(
  '/deliveries/history',
  deliverymanHistoryController.index,
);
deliverymanRouter.patch(
  '/deliveries/:delivery_id/pick',
  pickDeliveryController.update,
);
deliverymanRouter.patch(
  '/deliveries/:delivery_id/finalize',
  finalizeDeliveryController.update,
);
// deliverymanRouter.patch(
//   '/deliveries/:delivery_id/signature',
//   deliverymanDeliveriesController.update,
// );

export default deliverymanRouter;
