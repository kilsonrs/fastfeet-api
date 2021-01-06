import User from '../entities/User';
import ICreateUserDTO from '../useCases/CreateUser/CreateUserDTO';
import IUpdateUserDTO from '../useCases/UpdateUser/UpdateUserDTO';

interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(user: ICreateUserDTO): Promise<User>;
  save(user: IUpdateUserDTO): Promise<User>;
}

export default IUsersRepository;
