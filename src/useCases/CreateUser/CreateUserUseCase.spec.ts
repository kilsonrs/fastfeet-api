import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import AppError from '../../shared/errors/AppError';
import FakeHashProvider from '../../shared/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserUseCase from './CreateUserUseCase';

let createUser: CreateUserUseCase;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('Create User UseCase', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
  });

  it('Should be able create a new user', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      is_deliveryman: false,
      password: 'any_password',
      password_confirmation: 'any_password',
    });
    expect(user).toHaveProperty('id');
  });

  it('Should not be able create a new user with an email already in use', async () => {
    await createUser.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'same_email@mail.com',
      is_deliveryman: false,
      password: 'any_password',
      password_confirmation: 'any_password',
    });

    await expect(
      createUser.execute({
        name: 'other_name',
        cpf: 'other_cpf',
        email: 'same_email@mail.com',
        is_deliveryman: false,
        password: 'any_password',
        password_confirmation: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able create a new user with an cpf already in use', async () => {
    await createUser.execute({
      name: 'any_name',
      cpf: 'same_cpf',
      email: 'any_email@mail.com',
      is_deliveryman: false,
      password: 'any_password',
      password_confirmation: 'any_password',
    });

    await expect(
      createUser.execute({
        name: 'other_name',
        cpf: 'same_cpf',
        email: 'other_email@mail.com',
        is_deliveryman: false,
        password: 'any_password',
        password_confirmation: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a user if password and password_confirmation does not match', async () => {
    await expect(
      createUser.execute({
        name: 'any_name',
        cpf: 'same_cpf',
        email: 'any_email@mail.com',
        is_deliveryman: false,
        password: 'any_password',
        password_confirmation: 'other_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
