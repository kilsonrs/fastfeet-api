import { AppError } from "../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {
  }
  async execute(data: ICreateUserDTO) {

    const { email, cpf, password } = data

    const cpfAlreadyExists = await this.usersRepository.findByCpf(cpf)
    if (cpfAlreadyExists) {
      throw new AppError('An user already exists with this cpf.', 403)
    }

    const emailAlreadyExists = await this.usersRepository.findByEmail(email)
    if (emailAlreadyExists) {
      throw new AppError('An user already exists with this email.', 403)
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserUseCase;
