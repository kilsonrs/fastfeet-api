import { uuid } from 'uuidv4'
import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../useCases/CreateUser/CreateUserDTO";

class FakeUserRepository implements IUsersRepository {
  private users: User[] = []

  public async findByCpf(cpf: string) {
    const findUser = this.users.find(user => user.cpf === cpf)
    return findUser
  }

  public async findByEmail(email: string) {
    const findUser = this.users.find(user => user.email === email)
    return findUser
  }

  public async create(userData: ICreateUserDTO) {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData)
    this.users.push(user)
    return user;
  }

}

export default FakeUserRepository
