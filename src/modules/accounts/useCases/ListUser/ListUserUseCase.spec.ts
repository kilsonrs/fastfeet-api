// import { AppError } from '../../../../shared/errors/AppError';
import { FakeHashProvider } from '../../../../shared/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUserRepository } from '../../repositories/fakes/FakeUserRepository';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { ListUserUseCase } from './ListUserUseCase';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserUseCase;
let fakeHashProvider: FakeHashProvider;
let listUsersUseCase: ListUserUseCase;

describe('List User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
    listUsersUseCase = new ListUserUseCase(fakeUserRepository);
  });

  it('should be able to list users', async () => {
    const user1 = await createUser.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      password: 'any_password',
      password_confirmation: 'any_password',
    });
    const user2 = await createUser.execute({
      name: 'other_name',
      cpf: 'other_cpf',
      email: 'other_email@mail.com',
      password: 'other_password',
      password_confirmation: 'other_password',
    });
    const users = await listUsersUseCase.execute();
    expect(users).toEqual([user1, user2]);
  });
});
