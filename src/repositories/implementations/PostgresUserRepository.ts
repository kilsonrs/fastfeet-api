import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '../IUsersRepository';
import User from '../../entities/User';
import ICreateUserDTO from '../../useCases/CreateUser/CreateUserDTO';
import IUpdateUserDTO from '../../useCases/UpdateUser/UpdateUserDTO';

class PostgresUserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  public async findByCpf(cpf: string): Promise<User> {
    const user = await this.repository.findOne({ where: { cpf } });
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(userData);
    await this.repository.save(user);
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  public async save(userData: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.save(userData);
    return user;
  }
}

export default PostgresUserRepository;
