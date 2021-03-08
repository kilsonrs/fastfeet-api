import PostgresUserRepository from '../../repositories/implementations/PostgresUserRepository';
import BCryptHashProvider from '../../shared/providers/HashProvider/implementations/BCryptHashProvider';
import AuthenticateUserController from './AuthenticateUserController';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';
import UserMapper from '../../shared/mappers/UserMapper';

const usersRepository = new PostgresUserRepository();
const hashProvider = new BCryptHashProvider();

const authenticateUser = new AuthenticateUserUseCase(
  usersRepository,
  hashProvider,
);

const userMapper = new UserMapper();

const authenticateUserController = new AuthenticateUserController(
  authenticateUser,
  userMapper,
);

export { authenticateUser, authenticateUserController };
