import { AppError } from '../../../../shared/errors/AppError';
import { FakeHashProvider } from '../../../../shared/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUserRepository } from '../../repositories/fakes/FakeUserRepository';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { UpdateUserUseCase } from './UpdateUserUseCase';

let updateUser: UpdateUserUseCase;
let createUser: CreateUserUseCase;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('UpdateUser UseCase', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
    updateUser = new UpdateUserUseCase(fakeUserRepository);
  });

  it('should be able to update a user', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      is_deliveryman: false,
      password: 'any_password',
      password_confirmation: 'any_password',
    });
    const updatedUser = await updateUser.execute({
      id: user.id,
      name: 'other_name',
      email: 'other_email@mail.com',
      is_deliveryman: false,
      password: 'other_password',
      password_confirmation: 'other_password',
    });
    expect(updatedUser.name).toBe('other_name');
    expect(updatedUser.email).toBe('other_email@mail.com');
    expect(updatedUser.password).toBe('other_password');
  });

  it('Should not be able to update a non-existing user', async () => {
    await expect(
      updateUser.execute({
        id: 'invalid_id',
        email: 'any_email@mail.com',
        is_deliveryman: false,
        name: 'any_name',
        password: 'any_password',
        password_confirmation: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user if password and password_confirmation does not match', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      is_deliveryman: false,
      password: 'any_password',
      password_confirmation: 'any_password',
    });
    await expect(
      updateUser.execute({
        id: user.id,
        name: 'any_name',
        email: 'any_email@mail.com',
        is_deliveryman: false,
        password: 'any_password',
        password_confirmation: 'other_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
