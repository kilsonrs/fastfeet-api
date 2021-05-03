import { AppError } from '../../../../shared/errors/AppError';
import { FakeHashProvider } from '../../../../shared/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUserRepository } from '../../repositories/fakes/FakeUserRepository';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserUseCase;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateDeliverymanUseCase;

describe('AuthenticatedDeliveryman', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
    authenticateUser = new AuthenticateDeliverymanUseCase(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to Authenticate', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      password: 'any_password',
      password_confirmation: 'any_password',
    });
    const response = await authenticateUser.execute({
      cpf: 'any_cpf',
      password: 'any_password',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to Authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        cpf: 'non_existing_cpf',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to Authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      is_deliveryman: true,
      password: 'any_password',
      password_confirmation: 'any_password',
    });
    await expect(
      authenticateUser.execute({
        cpf: 'any_cpf',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to Authenticate with user non delivery man', async () => {
    await createUser.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      is_deliveryman: false,
      password: 'any_password',
      password_confirmation: 'any_password',
    });
    await expect(
      authenticateUser.execute({
        cpf: 'any_cpf',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
