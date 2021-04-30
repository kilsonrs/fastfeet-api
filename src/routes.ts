import { Joi, celebrate, Segments } from 'celebrate';
import validator from 'cpf-cnpj-validator';
import { Router } from 'express';

import authenticateUserController from './modules/accounts/useCases/AuthenticateUser';
import createUserController from './modules/accounts/useCases/CreateUser';
import updateUserController from './modules/accounts/useCases/UpdateUser';

const routes = Router();

routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.extend(validator).document().cpf(),
      email: Joi.string().email().required(),
      is_deliveryman: Joi.boolean().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  async (request, response) => {
    createUserController().handle(request, response);
  },
);

routes.post('/user-sessions', async (request, response) => {
  authenticateUserController().handle(request, response);
});

routes.put(
  '/users/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      is_deliveryman: Joi.boolean(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  async (request, response) => {
    updateUserController().handle(request, response);
  },
);

export { routes };
