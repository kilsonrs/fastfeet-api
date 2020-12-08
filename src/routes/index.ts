import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

import deliveriesRouter from './deliveries.routes';
import deliverymanRouter from './deliveryman.routes';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAdminOnly from '../middlewares/ensureAdminOnly';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);
routes.use('/deliveryman', deliverymanRouter);

routes.use(ensureAdminOnly);
routes.use('/deliveries', deliveriesRouter);

export default routes;
