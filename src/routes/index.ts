import { Router } from 'express';

import { deliverersRoutes } from './deliverersRoutes';
import { usersRoutes } from './usersRoutes';

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/deliverers', deliverersRoutes);
