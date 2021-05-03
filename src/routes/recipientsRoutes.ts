import { Router } from 'express';

import { CreateRecipientController } from '../modules/recipients/useCases/CreateRecipient/CreateRecipientController';
import { ListRecipientController } from '../modules/recipients/useCases/ListRecipient/ListRecipientController';
import { ensureAdminOnly } from '../shared/middlewares/ensureAdminOnly';
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated';

const recipientsRoutes = Router();

const createRecipientController = new CreateRecipientController();
const listRecipientController = new ListRecipientController();

recipientsRoutes.use(ensureAuthenticated);
recipientsRoutes.use(ensureAdminOnly);

recipientsRoutes.post('/', createRecipientController.handle);
recipientsRoutes.get('/', listRecipientController.handle);

export { recipientsRoutes };
