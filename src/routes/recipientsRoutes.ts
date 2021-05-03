import { Router } from 'express';

import { CreateRecipientController } from '../modules/recipients/useCases/CreateRecipient/CreateRecipientController';
import { ensureAdminOnly } from '../shared/middlewares/ensureAdminOnly';
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated';

const recipientsRoutes = Router();

const createRecipientController = new CreateRecipientController();

recipientsRoutes.use(ensureAuthenticated);
recipientsRoutes.use(ensureAdminOnly);

recipientsRoutes.post('/', createRecipientController.handle);

export { recipientsRoutes };
