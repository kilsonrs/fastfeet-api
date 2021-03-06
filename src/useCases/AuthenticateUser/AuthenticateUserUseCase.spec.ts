import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import CreateUserUseCase from '../CreateUser/CreateUserUseCase';
import FakeHashProvider from '../../shared/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';
import AppError from '../../shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserUseCase;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserUseCase;

describe('AuthenticatedUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserUseCase(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to Authenticate', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      is_deliveryman: false,
      password: 'any_password',
      password_confirmation: 'any_password',
    });
    const response = await authenticateUser.execute({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('Should not be able to Authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'non_existing_email@mail.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to Authenticate with wrong password', async () => {
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
        email: 'any_email@mail.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
