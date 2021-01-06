import { getRepository } from 'typeorm';

import IUsersRepository from '../IUsersRepository';
import User from '../../entities/User';
import ICreateUserDTO from '../../useCases/CreateUser/CreateUserDTO';
import IUpdateUserDTO from '../../useCases/UpdateUser/UpdateUserDTO';

class PostgresUserRepository implements IUsersRepository {
  public async findById(id: string): Promise<User | undefined> {
    const ormRepository = getRepository(User);
    const user = await ormRepository.findOne(id);
    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const ormRepository = getRepository(User);
    const user = await ormRepository.findOne({ where: { cpf } });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const ormRepository = getRepository(User);
    const user = await ormRepository.findOne({ where: { email } });
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const ormRepository = getRepository(User);
    const user = ormRepository.create(userData);
    await ormRepository.save(user);
    return user;
  }

  public async save(userData: IUpdateUserDTO): Promise<User> {
    const ormRepository = getRepository(User);
    const user = await ormRepository.save(userData);
    return user;
  }
}

export default PostgresUserRepository;
