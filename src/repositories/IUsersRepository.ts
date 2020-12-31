import { User } from "../entities/User"
import { ICreateUserDTO } from "../useCases/CreateUser/CreateUserDTO"

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>
  findByCpf(cpf: string): Promise<User | undefined>
  create(user: ICreateUserDTO): Promise<User>
}

export { IUsersRepository }
