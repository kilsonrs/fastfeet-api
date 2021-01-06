import { uuid } from 'uuidv4';
import IUsersRepository from '../IUsersRepository';
import User from '../../entities/User';
import ICreateUserDTO from '../../useCases/CreateUser/CreateUserDTO';
import IUpdateUserDTO from '../../useCases/UpdateUser/UpdateUserDTO';

class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.cpf === cpf);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);
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

export default FakeUserRepository;
