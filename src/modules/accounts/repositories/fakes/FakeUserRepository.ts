import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByCpf(cpf: string): Promise<User> {
    const findUser = this.users.find(user => user.cpf === cpf);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async list(): Promise<User[]> {
    return this.users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, userData);
    this.users.push(user);
    return user;
  }

  public async save(userData: IUpdateUserDTO): Promise<User> {
    const findIndex = this.users.findIndex(user => user.id === userData.id);
    const user = this.users[findIndex];
    Object.assign(user, userData);
    return user;
  }
}

export { FakeUserRepository };
