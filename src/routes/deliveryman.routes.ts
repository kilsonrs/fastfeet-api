import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '../config/upload';

import { DeliverymanDeliveriesController } from '../controllers/DeliverymanDeliveriesController';
import { DeliverymanHistoryController } from '../controllers/DeliverymanHistoryController';
import { PickDeliverymanDeliveryController } from '../controllers/PickDeliverymanDeliveryController';
import { FinalizeDeliverymanDeliveryController } from '../controllers/FinalizeDeliverymanDeliveryController';
import { SignatureDeliveryController } from '../controllers/SignatureDeliveryController';

const deliverymanRouter = Router();
const deliverymanDeliveriesController = new DeliverymanDeliveriesController();
const deliverymanHistoryController = new DeliverymanHistoryController();
const pickDeliveryController = new PickDeliverymanDeliveryController();
const finalizeDeliveryController = new FinalizeDeliverymanDeliveryController();
const signatureDeliveryController = new SignatureDeliveryController();

const upload = multer(uploadConfig.multer);

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
deliverymanRouter.patch(
  '/deliveries/:delivery_id/signature',
  upload.single('signature'),
  signatureDeliveryController.update,
);

export { deliverymanRouter };
