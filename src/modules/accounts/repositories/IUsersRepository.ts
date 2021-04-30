import { User } from '../entities/User';
import { ICreateUserDTO } from '../useCases/CreateUser/CreateUserDTO';
import { IUpdateUserDTO } from '../useCases/UpdateUser/UpdateUserDTO';

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByCpf(cpf: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(user: ICreateUserDTO): Promise<User>;
  save(user: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepository };
