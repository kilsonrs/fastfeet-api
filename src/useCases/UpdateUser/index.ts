import PostgresUserRepository from '../../repositories/implementations/PostgresUserRepository';
import UpdateUserController from './UpdateUserController';
import UpdateUserUseCase from './UpdateUserUseCase';

export default (): UpdateUserController => {
  const userRepository = new PostgresUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(userRepository);
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};
