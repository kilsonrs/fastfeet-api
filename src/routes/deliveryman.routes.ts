import { Router } from 'express';
import DeliverymanDeliveriesController from '../controllers/DeliverymanDeliveriesController';
import DeliverymanHistoryController from '../controllers/DeliverymanHistoryController';

const deliverymanRouter = Router();
const deliverymanDeliveriesController = new DeliverymanDeliveriesController();
const deliverymanHistoryController = new DeliverymanHistoryController();

deliverymanRouter.get('/deliveries', deliverymanDeliveriesController.index);

deliverymanRouter.get('/history', deliverymanHistoryController.index);

export default deliverymanRouter;
