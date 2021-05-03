import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByCpf(cpf: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(user: ICreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
  save(user: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepository };
