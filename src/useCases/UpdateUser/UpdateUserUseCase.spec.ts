import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../../shared/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserUseCase from '../CreateUser/CreateUserUseCase';
import UpdateUserUseCase from './UpdateUserUseCase';

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
  });
});
