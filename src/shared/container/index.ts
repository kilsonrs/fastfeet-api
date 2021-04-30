import { container } from 'tsyringe';

import { PostgresUserRepository } from '../../modules/accounts/repositories/implementations/PostgresUserRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PostgresUserRepository,
);
