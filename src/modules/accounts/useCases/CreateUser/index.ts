import { BCryptHashProvider } from '../../../../shared/providers/HashProvider/implementations/BCryptHashProvider';
import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

export default (): CreateUserController => {
  const usersRepository = new PostgresUserRepository();
  const hashProvider = new BCryptHashProvider();

  const createUserUseCase = new CreateUserUseCase(
    usersRepository,
    hashProvider,
  );

  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
