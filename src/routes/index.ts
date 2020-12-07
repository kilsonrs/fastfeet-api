import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import deliveriesRouter from './deliveries.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAdminOnly from '../middlewares/ensureAdminOnly';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated, ensureAdminOnly);
routes.use('/deliveries', deliveriesRouter);

export default routes;
