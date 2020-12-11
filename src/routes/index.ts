import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

import deliveryRouter from './delivery.routes';
import deliverymanRouter from './deliveryman.routes';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);
routes.use('/users', usersRouter);
routes.use('/deliveryman', deliverymanRouter);
routes.use('/deliveries', deliveryRouter);

export default routes;
