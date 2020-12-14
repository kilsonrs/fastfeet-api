import { Router } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password, cpf, deliveryman } = request.body;
  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
    cpf,
    deliveryman,
  });
  return response.json(classToClass(user));
});

export default usersRouter;
