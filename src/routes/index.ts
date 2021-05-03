import { Router } from 'express';

import { deliverersRoutes } from './deliverersRoutes';
import { deliveriesRoutes } from './deliveriesRoutes';
import { recipientsRoutes } from './recipientsRoutes';
import { usersRoutes } from './usersRoutes';

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/deliverers', deliverersRoutes);
routes.use('/recipients', recipientsRoutes);
routes.use('/deliveries', deliveriesRoutes);
