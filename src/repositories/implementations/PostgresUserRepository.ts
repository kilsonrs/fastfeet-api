import { getRepository } from 'typeorm'

import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../useCases/CreateUser/CreateUserDTO";

class PostgresUserRepository implements IUsersRepository {
  public async findByCpf(cpf: string) {
    const ormRepository = getRepository(User)
    const user = await ormRepository.findOne({ where: { cpf } })
    return user
  }

  public async findByEmail(email: string) {
    const ormRepository = getRepository(User)
    const user = await ormRepository.findOne({ where: { email } })
    return user
  }

  public async create(userData: ICreateUserDTO) {
    const ormRepository = getRepository(User)
    const user = ormRepository.create(userData)
    await ormRepository.save(user)
    return user;
  }

}

export default PostgresUserRepository
