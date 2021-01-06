import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import validator from 'cpf-cnpj-validator';
import { createUserController } from './useCases/CreateUser';

const router = Router();

router.post(
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
    createUserController.handle(request, response);
  },
);

export default router;
