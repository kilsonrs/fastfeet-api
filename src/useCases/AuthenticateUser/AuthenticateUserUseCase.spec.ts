import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import CreateUserUseCase from '../CreateUser/CreateUserUseCase';
import FakeHashProvider from '../../shared/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

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
});
