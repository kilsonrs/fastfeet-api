import { container } from 'tsyringe';

import { PostgresUserRepository } from '../../modules/accounts/repositories/implementations/PostgresUserRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { RecipientRepository } from '../../modules/recipients/repositories/implementations/RecipientRepository';
import { IRecipientRepository } from '../../modules/recipients/repositories/IRecipientRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PostgresUserRepository,
);

container.registerSingleton<IRecipientRepository>(
  'RecipientRepository',
  RecipientRepository,
);
