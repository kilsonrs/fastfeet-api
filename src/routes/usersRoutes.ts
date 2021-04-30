import { celebrate, Segments } from 'celebrate';
import validator from 'cpf-cnpj-validator';
import { Router } from 'express';
import Joi from 'joi';

import { AuthenticateUserController } from '../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';
import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController';
import { UpdateUserController } from '../modules/accounts/useCases/UpdateUser/UpdateUserController';

export const usersRoutes = Router();

const createUsersController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserController = new UpdateUserController();

usersRoutes.post(
  '/',
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
  createUsersController.handle,
);

usersRoutes.post('/sessions', authenticateUserController.handle);

usersRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      is_deliveryman: Joi.boolean(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  updateUserController.handle,
);
