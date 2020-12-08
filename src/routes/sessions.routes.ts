import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const authenticateUser = new AuthenticateUserService();
  const { cpf, email, password } = request.body;
  const user = await authenticateUser.execute({ cpf, email, password });
  return response.json(user);
});

export default sessionRouter;
