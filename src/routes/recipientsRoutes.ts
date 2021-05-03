import { Router } from 'express';

import { CreateRecipientsController } from '../modules/recipients/useCases/CreateRecipientsController';
import { ensureAdminOnly } from '../shared/middlewares/ensureAdminOnly';
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated';

const recipientsRoutes = Router();

const createRecipientsController = new CreateRecipientsController();

recipientsRoutes.use(ensureAuthenticated);
recipientsRoutes.use(ensureAdminOnly);

recipientsRoutes.post('/', createRecipientsController.handle);

export { recipientsRoutes };
